import faker from 'faker';

import { SomeRequired } from 'types';
import { Person } from 'lib/graphql';
import {
  getSharedFields,
  getReference,
  getEntityConnection,
} from 'testing/util/data';
import {
  newComment,
  newArticle,
  newContentRating,
  newAvatarImage,
  newAddress,
} from 'testing/data';

export const newPerson = (i?: number): SomeRequired<Person, '__typename'> => ({
  ...getSharedFields('Person'),

  info: faker.name.jobTitle(),
  intro: faker.lorem.sentences(2),
  name: faker.name.findName(),

  createsComment: getEntityConnection(newComment, i),
  createsContent: getEntityConnection(newArticle, i),
  createsRating: getEntityConnection(newContentRating, i),
  imagedBy: getReference(newAvatarImage, i),
  knownBy: getEntityConnection(),
  knows: getEntityConnection(),
  locatedByAddress: getReference(newAddress, i),
});
