import { ApolloError } from '@apollo/client';
import { GraphQLError } from 'graphql';

import { buildFeedQueryVariables, retryOnError } from 'util/graphql';

describe('buildFeedQueryVariables', () => {
  test('undefined filter', () => {
    expect(buildFeedQueryVariables({})).toEqual({});
  });

  test('empty filter', () => {
    expect(
      buildFeedQueryVariables({
        type: [],
        category: [],
      })
    ).toEqual({});
  });

  test('type filter', () => {
    expect(
      buildFeedQueryVariables({
        type: ['article', 'topic'],
      })
    ).toEqual({
      types: ['ARTICLE', 'TOPIC'],
    });
  });

  test('relation filter', () => {
    expect(
      buildFeedQueryVariables({
        category: ['123', '456'],
      })
    ).toEqual({
      categories: ['123', '456'],
    });
  });

  test('combined filters', () => {
    expect(
      buildFeedQueryVariables({
        type: ['article', 'topic'],
        category: ['123', '456'],
        location: ['789'],
      })
    ).toEqual({
      types: ['ARTICLE', 'TOPIC'],
      categories: ['123', '456'],
      locations: ['789'],
    });
  });
});

describe('retryOnError', () => {
  const mutate = jest.fn();
  let success: boolean;
  let error: Error;

  beforeEach(() => {
    success = false;
    error = new ApolloError({
      errorMessage: 'SAMPLE_ERROR',
      graphQLErrors: [new GraphQLError('GRAPHQL_ERROR')],
    });
  });

  const evaluateSuccessAfterDelay = () =>
    new Promise<void>((resolve, reject) => {
      mutate();
      setTimeout(() => (success ? resolve() : reject(error)), 200);
    });

  test('initial success without retry', async () => {
    success = true;
    await retryOnError(evaluateSuccessAfterDelay);
    expect(mutate).toHaveBeenCalledTimes(1);
  });

  test('retry with success', async () => {
    setTimeout(() => {
      success = true;
    }, 2000);
    await retryOnError(evaluateSuccessAfterDelay);
    expect(mutate).toHaveBeenCalledTimes(4);
  });

  test('retry without success', async () => {
    await expect(retryOnError(evaluateSuccessAfterDelay)).rejects.toThrow(
      'SAMPLE_ERROR'
    );
    expect(mutate).toHaveBeenCalledTimes(11);
  });

  test('retry only once', async () => {
    await expect(retryOnError(evaluateSuccessAfterDelay, 1)).rejects.toThrow(
      'SAMPLE_ERROR'
    );
    expect(mutate).toHaveBeenCalledTimes(2);
  });

  test('only retry when receiving errors from Apollo', async () => {
    error = new Error('SAMPLE_ERROR');
    await expect(retryOnError(evaluateSuccessAfterDelay, 1)).rejects.toThrow(
      'SAMPLE_ERROR'
    );
    expect(mutate).toHaveBeenCalledTimes(1);
  });

  test('only retry when receiving remote GraphQL errors', async () => {
    error = new ApolloError({ errorMessage: 'SAMPLE_ERROR' });
    await expect(retryOnError(evaluateSuccessAfterDelay, 1)).rejects.toThrow(
      'SAMPLE_ERROR'
    );
    expect(mutate).toHaveBeenCalledTimes(1);
  });
});
