import faker from 'faker';

import { SomeRequired } from 'types';
import { MembershipInvite } from 'lib/graphql';
import { getSharedFields, getReference } from 'testing/util/data';
import { newGroup, newOnlineAccount } from 'testing/data';

export const newMembershipInvite = (
  i?: number
): SomeRequired<MembershipInvite, '__typename'> => ({
  ...getSharedFields('MembershipInvite'),

  managedBy: getReference(newGroup, i),
  text: faker.lorem.sentences(),
  receivedBy: getReference(newOnlineAccount, i),
});
