import { GROUP_ROLE_NAMES } from 'lib/constants';
import {
  useRolesQuery,
  useMembershipCreateMutation,
  useMembershipInviteCreateMutation,
  useMembershipRequestCreateMutation,
  useMembershipInviteModifyMutation,
  useMembershipRequestModifyMutation,
} from 'lib/graphql';
import { useProfile } from 'hooks/profile';
import { removeFromConnectionStore } from 'util/cache';

/** Returns a function to create a new membership via GraphQL. */
export const useMembershipSubmit = () => {
  const { data: rolesData } = useRolesQuery();
  const possibleRoles = rolesData?.roles.edges.map((edge) => edge.node);

  const [createMembership] = useMembershipCreateMutation();

  const createNewMembership = async (
    onlineAccountId: string,
    roleName: keyof typeof GROUP_ROLE_NAMES,
    groupId: string
  ) => {
    const roleId = possibleRoles?.find(
      ({ name }) => name === GROUP_ROLE_NAMES[roleName]
    )?.id;

    if (!roleId) throw new Error('Unknown role');

    const { data: createResult } = await createMembership({
      variables: {
        onlineAccount: onlineAccountId,
        role: roleId,
        group: groupId,
      },
    });

    return createResult?.membershipCreate;
  };

  return createNewMembership;
};

/** Returns a function to create a new membership invite via GraphQL. */
export const useMembershipInvite = (groupId: string) => {
  const [createMembershipInvite] = useMembershipInviteCreateMutation();

  const createNewMembershipInvite = async (
    onlineAccountId: string,
    text?: string
  ) => {
    const { data: createResult } = await createMembershipInvite({
      variables: {
        group: groupId,
        onlineAccount: onlineAccountId,
        text,
      },
    });

    return createResult?.membershipInviteCreate;
  };

  return createNewMembershipInvite;
};

/** Returns a function to create a new membership request via GraphQL. */
export const useMembershipRequest = (groupId: string) => {
  const [createMembershipInvite] = useMembershipRequestCreateMutation();

  const createNewMembershipRequest = async (text?: string) => {
    const { data: createResult } = await createMembershipInvite({
      variables: {
        group: groupId,
        text,
      },
    });

    return createResult?.membershipRequestCreate;
  };

  return createNewMembershipRequest;
};

/** Returns a function to accept or decline a membership invite via GraphQL. */
export const useMembershipInviteResponse = () => {
  const viewerProfile = useProfile();
  const [modifyMembershipInvite] = useMembershipInviteModifyMutation();

  return async (membershipInviteId: string, shouldAccept: boolean) => {
    if (!viewerProfile) throw new Error('Missing account info');

    await modifyMembershipInvite({
      variables: {
        membershipInvite: membershipInviteId,
        isAccepted: shouldAccept,
      },
      update: (cache) => {
        cache.modify({
          id: viewerProfile.representedBy.id,
          fields: {
            receives: removeFromConnectionStore(membershipInviteId),
          },
        });
      },
    });
  };
};

/** Returns a function to accept or decline a membership request via GraphQL. */
export const useMembershipRequestResponse = () => {
  const [modifyMembershipInvite] = useMembershipRequestModifyMutation();

  return async (membershipRequestId: string, shouldAccept: boolean) => {
    await modifyMembershipInvite({
      variables: {
        membershipRequest: membershipRequestId,
        isAccepted: shouldAccept,
      },
      update: (cache, { data }) => {
        cache.modify({
          id: data?.membershipRequestModify.receivedBy?.id,
          fields: {
            receives: removeFromConnectionStore(membershipRequestId),
          },
        });
      },
    });
  };
};
