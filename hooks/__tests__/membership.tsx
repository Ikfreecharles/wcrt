import { renderHook, TestingContext, apollo, auth } from 'testing/util';
import {
  MembershipCreateDocument,
  MembershipInviteCreateDocument,
  MembershipInviteModifyDocument,
  MembershipRequestCreateDocument,
  MembershipRequestModifyDocument,
} from 'lib/graphql';
import {
  useMembershipSubmit,
  useMembershipInvite,
  useMembershipRequest,
  useMembershipInviteResponse,
  useMembershipRequestResponse,
} from 'hooks/membership';

jest.mock('hooks/profile');

describe('useMembershipSubmit', () => {
  beforeAll(() => {
    apollo.response = {
      roles: {
        edges: [
          {
            node: {
              id: 'T:123:Role',
              name: 'groupMember',
            },
          },
          {
            node: {
              id: 'T:456:Role',
              name: 'groupAdmin',
            },
          },
        ],
      },
      membershipCreate: {
        id: 'T:123:Membership',
      },
      membershipInviteCreate: {
        id: 'T:123:MembershipInvite',
      },
      membershipRequestCreate: {
        id: 'T:123:MembershipRequest',
      },
    };
  });

  test('create a new membership', async () => {
    const { result } = renderHook(() => useMembershipSubmit(), {
      wrapper: TestingContext,
    });
    await result.current('T:123:OnlineAccount', 'member', 'T:123:Group');
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(MembershipCreateDocument, {
      onlineAccount: 'T:123:OnlineAccount',
      role: 'T:123:Role',
      group: 'T:123:Group',
    });
  });

  test('create a new admin membership', async () => {
    const { result } = renderHook(() => useMembershipSubmit(), {
      wrapper: TestingContext,
    });
    await result.current('T:123:OnlineAccount', 'admin', 'T:123:Group');
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(MembershipCreateDocument, {
      onlineAccount: 'T:123:OnlineAccount',
      role: 'T:456:Role',
      group: 'T:123:Group',
    });
  });
});

describe('useMembershipInvite', () => {
  test('create a new membership invite', async () => {
    const { result } = renderHook(() => useMembershipInvite('T:123:Group'), {
      wrapper: TestingContext,
    });
    await result.current('T:123:OnlineAccount', 'Sample text');
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(MembershipInviteCreateDocument, {
      group: 'T:123:Group',
      onlineAccount: 'T:123:OnlineAccount',
      text: 'Sample text',
    });
  });
});

describe('useMembershipRequest', () => {
  test('create a new membership request', async () => {
    const { result } = renderHook(() => useMembershipRequest('T:123:Group'), {
      wrapper: TestingContext,
    });
    await result.current('Sample text');
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(
      MembershipRequestCreateDocument,
      {
        group: 'T:123:Group',
        text: 'Sample text',
      }
    );
  });
});

describe('useMembershipInviteResponse', () => {
  beforeAll(() => {
    auth.session = auth.getActiveSession();
  });

  test('accept a membership invite', async () => {
    const { result } = renderHook(() => useMembershipInviteResponse(), {
      wrapper: TestingContext,
    });
    await result.current('T:123:MembershipInvite', true);
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(MembershipInviteModifyDocument, {
      membershipInvite: 'T:123:MembershipInvite',
      isAccepted: true,
    });
  });

  test('decline a membership invite', async () => {
    const { result } = renderHook(() => useMembershipInviteResponse(), {
      wrapper: TestingContext,
    });
    await result.current('T:123:MembershipInvite', false);
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(MembershipInviteModifyDocument, {
      membershipInvite: 'T:123:MembershipInvite',
      isAccepted: false,
    });
  });
});

describe('useMembershipRequestResponse', () => {
  test('accept a membership request', async () => {
    const { result } = renderHook(() => useMembershipRequestResponse(), {
      wrapper: TestingContext,
    });
    await result.current('T:123:MembershipRequest', true);
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(
      MembershipRequestModifyDocument,
      {
        membershipRequest: 'T:123:MembershipRequest',
        isAccepted: true,
      }
    );
  });

  test('decline a membership request', async () => {
    const { result } = renderHook(() => useMembershipRequestResponse(), {
      wrapper: TestingContext,
    });
    await result.current('T:123:MembershipRequest', false);
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(
      MembershipRequestModifyDocument,
      {
        membershipRequest: 'T:123:MembershipRequest',
        isAccepted: false,
      }
    );
  });
});
