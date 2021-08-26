import faker from 'faker';

import { SomeRequired } from 'types';
import { MembershipRequest } from 'lib/graphql';
import { getSharedFields, getReference } from 'testing/util/data';
import { newGroup, newOnlineAccount } from 'testing/data';

export const newMembershipRequest = (
  i?: number
): SomeRequired<MembershipRequest, '__typename'> => ({
  ...getSharedFields('MembershipRequest'),

  ownedBy: getReference(newOnlineAccount, i),
  text: faker.lorem.sentences(),
  receivedBy: getReference(newGroup, i),
});
