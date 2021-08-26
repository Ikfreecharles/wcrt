import { SomeRequired } from 'types';
import { ContentRating } from 'lib/graphql';
import { getSharedFields, getReference } from 'testing/util/data';
import { newArticle, newPerson } from 'testing/data';

export const newContentRating = (
  i?: number
): SomeRequired<ContentRating, '__typename'> => ({
  ...getSharedFields('ContentRating'),

  rates: getReference(newArticle, i),
  createdBy: getReference(newPerson, i),
});
