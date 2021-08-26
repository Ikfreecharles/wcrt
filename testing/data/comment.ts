import faker from 'faker';

import { SomeRequired } from 'types';
import { Comment } from 'lib/graphql';
import {
  getSharedFields,
  getReference,
  getEntityConnection,
} from 'testing/util/data';
import { newArticle, newPerson, newCommentRating } from 'testing/data';

export const newComment = (
  i?: number
): SomeRequired<Comment, '__typename'> => ({
  ...getSharedFields('Comment'),

  text: faker.lorem.sentences(),

  comments: getReference(newArticle, i),
  createdBy: getReference(newPerson, i),
  ratedBy: getEntityConnection(newCommentRating, i),
});
