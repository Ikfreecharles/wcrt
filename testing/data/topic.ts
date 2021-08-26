import faker from 'faker';

import { SomeRequired } from 'types';
import { Topic, Visibility } from 'lib/graphql';
import {
  getSharedFields,
  getReference,
  getEntityConnection,
} from 'testing/util/data';
import {
  newCategory,
  newGroup,
  newArticle,
  newImage,
  newAddress,
} from 'testing/data';

export const newTopic = (
  i?: number
): SomeRequired<Topic, '__typename'> & {
  ratingStats: { count: number };
  commentStats: { count: number };
} => ({
  ...getSharedFields('Topic'),
  _viewer: {
    ratedBy: { count: 0 },
    commentedBy: { count: 0 },
  } as any,

  intro: faker.lorem.sentences(2),
  title: faker.lorem.sentence(),
  visibility: Visibility.Public,

  categorizedBy: getEntityConnection(newCategory, i),
  commentedBy: getEntityConnection(),
  createdByGroup: getReference(newGroup, i),
  createdByPerson: null,
  curatedBy: getEntityConnection(),
  curates: getEntityConnection(newArticle, i),
  imagedBy: getEntityConnection(newImage, i),
  locatedByAddress: getReference(newAddress, i),
  managedBy: getEntityConnection(),
  ratedBy: getEntityConnection(),

  ratingStats: { count: faker.random.number({ min: 2, max: 4 }) },
  commentStats: { count: faker.random.number({ min: 2, max: 4 }) },
});
