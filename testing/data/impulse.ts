import faker from 'faker';

import { SomeRequired } from 'types';
import { Impulse, Visibility } from 'lib/graphql';
import {
  getSharedFields,
  getReference,
  getEntityConnection,
} from 'testing/util/data';
import {
  newCategory,
  newComment,
  newPerson,
  newTopic,
  newImage,
  newAddress,
  newContentRating,
  newGroup,
} from 'testing/data';

export const newImpulse = (
  i?: number
): SomeRequired<Impulse, '__typename'> & {
  ratingStats: { count: number };
  commentStats: { count: number };
} => ({
  ...getSharedFields('Impulse'),
  _viewer: {
    ratedBy: { count: 0 },
    commentedBy: { count: 0 },
  } as any,

  intro: faker.lorem.sentences(2),
  title: faker.lorem.sentence(),
  relevance: faker.random.number(100),
  visibility: Visibility.Public,

  categorizedBy: getEntityConnection(newCategory, i),
  commentedBy: getEntityConnection(newComment, i),
  coveredBy: getEntityConnection(newGroup, i),
  createdByGroup: null,
  createdByPerson: getReference(newPerson, i),
  curatedBy: getEntityConnection(newTopic, i),
  imagedBy: getEntityConnection(newImage, i),
  locatedByAddress: getReference(newAddress, i),
  managedBy: getEntityConnection(),
  ratedBy: getEntityConnection(newContentRating, i),

  ratingStats: { count: faker.random.number({ min: 2, max: 4 }) },
  commentStats: { count: faker.random.number({ min: 2, max: 4 }) },
});
