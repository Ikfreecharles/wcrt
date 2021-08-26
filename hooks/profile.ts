import { ProfileFormData } from 'types';
import { useSession } from 'lib/auth';
import {
  useMyAccountInfoQuery,
  usePersonModifyMutation,
  usePersonAssignMutation,
} from 'lib/graphql';
import { getOptimizedFetchPolicy } from 'util/graphql';

/** Returns profile data for my own account. */
export const useProfile = () => {
  const [session] = useSession();
  const { data } = useMyAccountInfoQuery({
    skip: !session,
    ...getOptimizedFetchPolicy(),
  });

  if (!data?.me?.represents) return null;

  return {
    ...data.me.represents,
    representedBy: {
      id: data.me.id,
      email: data.me.email,
    },
  };
};

/** Returns a function to update profile data via GraphQL. */
export const useProfileSubmit = () => {
  const viewerProfile = useProfile();

  const [modifyPerson] = usePersonModifyMutation();
  const [assignPerson] = usePersonAssignMutation();

  return async (data: ProfileFormData) => {
    if (!viewerProfile) throw new Error('Missing account info');

    await Promise.all([
      modifyPerson({
        variables: {
          person: viewerProfile.id,
          name: data.name,
          info: data.info,
          intro: data.intro,
        },
      }),
      assignPerson({
        variables: {
          person: viewerProfile.id,
          image: data.image?.id || null,
          address: data.locations.length ? data.locations[0] : null,
        },
      }),
    ]);

    return viewerProfile.id;
  };
};
