import { submit } from 'testing/util';

export const useMembershipSubmit =
  () =>
  async (...args: any) => {
    submit('membership', ...args);
    return { id: 'T:123:Membership' };
  };

export const useMembershipInvite =
  (groupId: string) =>
  async (...args: any) => {
    submit('membershipInvite', groupId, ...args);
    return { id: 'T:123:MembershipInvite' };
  };

export const useMembershipRequest =
  (groupId: string) =>
  async (...args: any) => {
    submit('membershipRequest', groupId, ...args);
    return { id: 'T:123:MembershipRequest' };
  };

export const useMembershipInviteResponse =
  () =>
  async (...args: any) => {
    submit('response', ...args);
  };

export const useMembershipRequestResponse =
  () =>
  async (...args: any) => {
    submit('response', ...args);
  };
