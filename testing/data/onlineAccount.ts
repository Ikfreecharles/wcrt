import { SomeRequired } from 'types';
import { OnlineAccount } from 'lib/graphql';
import {
  getSharedFields,
  getReference,
  getEntityConnection,
} from 'testing/util/data';
import { newMembership, newPerson } from 'testing/data';
import { newMembershipInvite } from './membershipInvite';

export const newOnlineAccount = (
  i?: number
): SomeRequired<OnlineAccount, '__typename'> => ({
  ...getSharedFields('OnlineAccount'),

  ownsMembership: getEntityConnection(newMembership, i),
  receives: getEntityConnection(newMembershipInvite, i),
  represents: getReference(newPerson, i),
  responds: getEntityConnection(),
});
