import { SomeRequired } from 'types';
import { CommentRating } from 'lib/graphql';
import { getSharedFields, getReference } from 'testing/util/data';
import { newComment, newPerson } from 'testing/data';

export const newCommentRating = (
  i?: number
): SomeRequired<CommentRating, '__typename'> => ({
  ...getSharedFields('CommentRating'),

  rates: getReference(newComment, i),
  createdBy: getReference(newPerson, i),
});
