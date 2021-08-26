import { GroupFormData } from 'types';
import {
  useGroupCreateMutation,
  useGroupModifyMutation,
  useGroupAssignMutation,
  GroupTeaserFragmentDoc,
} from 'lib/graphql';
import { useProfile } from 'hooks/profile';
import { useMembershipSubmit } from 'hooks/membership';
import { retryOnError } from 'util/graphql';
import { addGlobalTeaserFragment } from 'util/cache';

/**
 * Returns a hybrid function to submit group data via GraphQL. Creates a new
 * group by default, but can also update an existing one if initialized with an
 * ID. If an impulse ID is submitted, the group will be related with that
 * impulse on creation.
 */
export const useGroupSubmit = (
  existingGroupId?: string,
  relatedImpulseId?: string
) => {
  const viewerProfile = useProfile();
  const createMembership = useMembershipSubmit();

  const [createGroup, { client }] = useGroupCreateMutation();
  const [modifyGroup] = useGroupModifyMutation();
  const [assignGroup] = useGroupAssignMutation();

  const modifyGroupRelations = async (id: string, data: GroupFormData) => {
    if (!viewerProfile) throw new Error('Missing account info');

    return (
      await assignGroup({
        variables: {
          group: id,
          image: data.image?.id || null,
          category: data.categories.length ? data.categories[0] : null,
          address: data.locations.length ? data.locations[0] : null,
        },
      })
    ).data?.groupSetLocatedByAddressRelation;
  };

  const createNewGroup = async (data: GroupFormData) => {
    if (!viewerProfile || !viewerProfile.representedBy)
      throw new Error('Missing account info');

    const { data: createResult } = await createGroup({
      variables: {
        name: data.name,
        info: data.info,
        intro: data.intro,
        contactInfo: data.contactInfo,
        impulse: relatedImpulseId,
      },
    });

    const newGroupId = createResult?.groupCreate.id;
    if (!newGroupId) throw new Error('Missing mutation response');

    const newData = await retryOnError(() =>
      modifyGroupRelations(newGroupId, data)
    );
    if (!newData) throw new Error('Missing mutation response');

    const initialMembership = await createMembership(
      viewerProfile.representedBy.id,
      'admin',
      newGroupId
    );
    if (!initialMembership) throw new Error('Missing initial membership');

    newData.administeredBy.edges.push({ node: initialMembership });
    newData.administeredBy.count = newData.administeredBy.edges.length;

    addGlobalTeaserFragment(
      client.cache,
      {
        type: 'Group',
        categories: data.categories,
        locations: data.locations,
      },
      {
        fragment: GroupTeaserFragmentDoc,
        fragmentName: 'GroupTeaser',
        data: newData,
      }
    );

    return newGroupId;
  };

  const modifyExistingGroup = async (data: GroupFormData) => {
    if (!existingGroupId) throw new Error('Missing existing group');

    await Promise.all([
      modifyGroup({
        variables: {
          group: existingGroupId,
          name: data.name,
          info: data.info,
          intro: data.intro,
          contactInfo: data.contactInfo,
        },
      }),
      modifyGroupRelations(existingGroupId, data),
    ]);

    return existingGroupId;
  };

  return existingGroupId ? modifyExistingGroup : createNewGroup;
};
