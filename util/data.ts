import { GROUP_ROLE_NAMES } from 'lib/constants';
import { Maybe, AgentAvatarFragment, GroupStateFragment } from 'lib/graphql';

/** Extract the avatars of group members out of a larger query. */
export const getGroupMemberAvatars = (administeredBy: {
  edges: {
    node: {
      ownedBy?: Maybe<{
        represents?: Maybe<AgentAvatarFragment>;
      }>;
    };
  }[];
}) =>
  administeredBy.edges
    .map((edge) => edge.node.ownedBy?.represents)
    .filter((item) => !!item) as AgentAvatarFragment[];

/** Extract the group role of the viewer out of a larger query. */
export const getViewerGroupRole = (data: GroupStateFragment | undefined) => {
  const roleValue = data?._viewer.administeredBy.edges[0]?.node.definedBy
    ?.name as
    | typeof GROUP_ROLE_NAMES[keyof typeof GROUP_ROLE_NAMES]
    | undefined;

  const roleName = (
    Object.keys(GROUP_ROLE_NAMES) as (keyof typeof GROUP_ROLE_NAMES)[]
  ).find((key) => GROUP_ROLE_NAMES[key] === roleValue);

  return roleName || 'member';
};
