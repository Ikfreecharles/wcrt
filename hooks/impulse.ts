import { ImpulseFormData } from 'types';
import {
  useImpulseCreateMutation,
  useImpulseModifyMutation,
  useImpulseAssignMutation,
  ImpulseTeaserFragmentDoc,
} from 'lib/graphql';
import { useProfile } from 'hooks/profile';
import { useCommentSubmit } from 'hooks/comment';
import { retryOnError } from 'util/graphql';
import { addGlobalTeaserFragment } from 'util/cache';

/**
 * Returns a hybrid function to submit impulse data via GraphQL. Creates a new
 * impulse by default, but can also update an existing one if initialized with an ID.
 */
export const useImpulseSubmit = (existingImpulseId?: string) => {
  const viewerProfile = useProfile();
  const createComment = useCommentSubmit();

  const [createImpulse, { client }] = useImpulseCreateMutation();
  const [modifyImpulse] = useImpulseModifyMutation();
  const [assignImpulse] = useImpulseAssignMutation();

  const modifyImpulseRelations = async (id: string, data: ImpulseFormData) =>
    (
      await assignImpulse({
        variables: {
          impulse: id,
          images: data.images.map((image) => image.id),
          address: data.locations.length ? data.locations[0] : null,
          categories: data.categories,
        },
      })
    ).data?.impulseModifyCategorizedByCategoryRelation;

  const createNewImpulse = async (data: ImpulseFormData) => {
    if (!viewerProfile) throw new Error('Missing account info');

    const { data: createResult } = await createImpulse({
      variables: {
        title: data.title,
        intro: data.intro,
        person: viewerProfile.id,
      },
    });

    const newImpulseId = createResult?.impulseCreate.id;
    if (!newImpulseId) throw new Error('Missing mutation response');

    const newData = await retryOnError(() =>
      modifyImpulseRelations(newImpulseId, data)
    );

    if (data.hasSolution && data.solution) {
      await createComment(newImpulseId, {
        text: data.solution,
      });
    }

    addGlobalTeaserFragment(
      client.cache,
      {
        type: 'Impulse',
        categories: data.categories,
        locations: data.locations,
      },
      {
        fragment: ImpulseTeaserFragmentDoc,
        fragmentName: 'ImpulseTeaser',
        data: newData,
      }
    );

    return newImpulseId;
  };

  const modifyExistingImpulse = async (data: ImpulseFormData) => {
    if (!existingImpulseId) throw new Error('Missing existing impulse');

    await Promise.all([
      modifyImpulse({
        variables: {
          impulse: existingImpulseId,
          title: data.title,
          intro: data.intro,
        },
      }),
      modifyImpulseRelations(existingImpulseId, data),
    ]);

    return existingImpulseId;
  };

  return existingImpulseId ? modifyExistingImpulse : createNewImpulse;
};
