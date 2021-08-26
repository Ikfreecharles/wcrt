import faker from 'faker';

import { PageInfo } from 'lib/graphql';

export const factory = <T>(
  newEntity: () => T,
  number: number = faker.random.number({ min: 2, max: 4 })
) => {
  const result = [];

  for (let i = 0; i < number; i++) {
    result[i] = newEntity();
  }

  return result;
};

export const getSharedFields = <K extends string>(type: K) => ({
  __typename: type,
  id: `T:${faker.random.uuid()}:${type}`,
  createdAt: faker.date.recent(),
  updatedAt: faker.date.recent(),
  _viewer: {} as any,
});

export const getReference = <T>(newEntity?: (i?: number) => T, depth = 2) =>
  newEntity && depth > 0 ? newEntity(depth - 1) : undefined;

export const getEntityConnection = <T extends { id: string }>(
  newEntity?: (i?: number) => T,
  depth = 2,
  pageInfo?: PageInfo
) => {
  const numberOfEdges =
    newEntity && depth > 0 ? faker.random.number({ min: 2, max: 4 }) : 0;
  const edges = [];

  for (let i = 0; i < numberOfEdges; i++) {
    edges[i] = { node: getReference(newEntity, depth) as T };
  }

  return {
    count: numberOfEdges,
    pageInfo: {
      hasNextPage: false,
      hasPreviousPage: false,
      endCursor: edges.length ? edges[edges.length - 1].node.id : undefined,
      ...pageInfo,
    },
    edges,
  };
};
