import {
  renderHook,
  TestingContext,
  auth,
  apollo,
  act,
  contentState,
} from 'testing/util';
import {
  ContentRatingCreateDocument,
  ContentRatingDeleteDocument,
} from 'lib/graphql';
import { useSupport } from 'hooks/support';

jest.mock('hooks/profile');
jest.mock('hooks/content');

describe('useSupport', () => {
  beforeAll(() => {
    auth.session = auth.getActiveSession();
    apollo.response = {
      contentRatingCreate: {
        __typename: 'ContentRating',
        id: 'T:123:ContentRating',
      },
      contentRatings: {
        edges: [{ node: { id: 'T:456:ContentRating' } }],
      },
    };
  });

  test('new rating', async () => {
    const { result } = renderHook(() => useSupport('T:123:Article'), {
      wrapper: TestingContext,
    });
    await act(async () => {
      await result.current.toggleSupport();
    });
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(ContentRatingCreateDocument, {
      agent: 'T:123:Person',
      content: 'T:123:Article',
    });
  });

  test('existing rating', async () => {
    contentState.supported = true;
    const { result } = renderHook(() => useSupport('T:123:Article'), {
      wrapper: TestingContext,
    });
    await act(async () => {
      await result.current.toggleSupport();
    });
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(ContentRatingDeleteDocument, {
      contentRating: 'T:456:ContentRating',
    });
  });
});
