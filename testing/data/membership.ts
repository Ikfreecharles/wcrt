import { SomeRequired } from 'types';
import { Membership } from 'lib/graphql';
import { getSharedFields, getReference } from 'testing/util/data';
import { newGroup, newOnlineAccount, newRole } from 'testing/data';

export const newMembership = (
  i?: number
): SomeRequired<Membership, '__typename'> => ({
  ...getSharedFields('Membership'),

  administers: getReference(newGroup, i),
  definedBy: getReference(newRole, i),
  ownedBy: getReference(newOnlineAccount, i),
});
