import faker from 'faker';

import { SomeRequired } from 'types';
import { Article, Visibility } from 'lib/graphql';
import {
  getSharedFields,
  getReference,
  getEntityConnection,
} from 'testing/util/data';
import {
  newCategory,
  newComment,
  newGroup,
  newTopic,
  newImage,
  newAddress,
  newContentRating,
} from 'testing/data';

export const newArticle = (
  i?: number
): SomeRequired<Article, '__typename'> & {
  ratingStats: { count: number };
  commentStats: { count: number };
} => ({
  ...getSharedFields('Article'),
  _viewer: {
    ratedBy: { count: 0 },
    commentedBy: { count: 0 },
  } as any,

  intro: faker.lorem.sentences(2),
  text: faker.lorem.paragraphs(),
  title: faker.lorem.sentence(),
  visibility: Visibility.Public,

  categorizedBy: getEntityConnection(newCategory, i),
  commentedBy: getEntityConnection(newComment, i),
  createdByGroup: getReference(newGroup, i),
  createdByPerson: null,
  curatedBy: getEntityConnection(newTopic, i),
  imagedBy: getEntityConnection(newImage, i),
  locatedByAddress: getReference(newAddress, i),
  managedBy: getEntityConnection(),
  ratedBy: getEntityConnection(newContentRating, i),

  ratingStats: { count: faker.random.number({ min: 2, max: 4 }) },
  commentStats: { count: faker.random.number({ min: 2, max: 4 }) },
});
