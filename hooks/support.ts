import { useState } from 'react';

import {
  useContentRatingCreateMutation,
  useContentRatingDeleteMutation,
  useRatingOfContentQuery,
  RatingFragmentDoc,
  ContentRatingTeaserFragmentDoc,
} from 'lib/graphql';
import { useContentState } from 'hooks/content';
import { useProfile } from 'hooks/profile';
import {
  addToConnectionStore,
  removeFromConnectionStore,
  modifyStoreFieldCount,
} from 'util/cache';

/**
 * Returns helpers for toggling the support state of a content entity. Creates
 * or deletes a rating via GraphQL.
 */
export const useSupport = (contentId: string) => {
  const viewerProfile = useProfile();
  const { supported } = useContentState(contentId);
  const [pending, setPending] = useState(false);

  const { refetch: findExistingRating } = useRatingOfContentQuery({
    skip: true,
  });

  const [createRating] = useContentRatingCreateMutation();
  const [deleteRating] = useContentRatingDeleteMutation();

  const createNewRating = async () => {
    if (!viewerProfile) throw new Error('Missing account info');

    setPending(true);

    const { data: createResult } = await createRating({
      variables: {
        agent: viewerProfile.id,
        content: contentId,
      },
      update: (cache, { data }) => {
        // Add the new rating to the content.
        cache.modify({
          id: contentId,
          fields: {
            ratedBy: addToConnectionStore(
              cache.writeFragment({
                fragment: RatingFragmentDoc,
                fragmentName: 'Rating',
                data: data?.contentRatingCreate,
              }),
              'RatingEdge',
              true
            ),
            _viewer: modifyStoreFieldCount('ratedBy', +1),
          },
        });

        // Add the new rating to my own profile.
        cache.modify({
          id: viewerProfile.id,
          fields: {
            createsRating: addToConnectionStore(
              cache.writeFragment({
                fragment: ContentRatingTeaserFragmentDoc,
                fragmentName: 'ContentRatingTeaser',
                data: data?.contentRatingCreate,
              }),
              'RatingEdge',
              true
            ),
          },
        });
      },
    });

    setPending(false);

    if (!createResult) throw new Error('Missing mutation response');

    return createResult.contentRatingCreate.id;
  };

  const deleteExistingRating = async () => {
    if (!viewerProfile) throw new Error('Missing account info');

    setPending(true);

    const { data: findResult } = await findExistingRating({
      agent: viewerProfile.id,
      content: contentId,
    });

    const ratingId = findResult.contentRatings.edges.length
      ? findResult.contentRatings.edges[0].node.id
      : null;

    if (!ratingId) {
      setPending(false);
      throw new Error('Missing existing rating');
    }

    await deleteRating({
      variables: { contentRating: ratingId },
      update: (cache) => {
        // Remove the rating from the content.
        cache.modify({
          id: contentId,
          fields: {
            ratedBy: removeFromConnectionStore(ratingId),
            _viewer: modifyStoreFieldCount('ratedBy', -1),
          },
        });

        // Remove the rating from my own profile.
        cache.modify({
          id: viewerProfile.id,
          fields: {
            createsRating: removeFromConnectionStore(ratingId),
          },
        });
      },
    });

    setPending(false);
  };

  return {
    toggleSupport: () =>
      supported ? deleteExistingRating() : createNewRating(),
    supportPending: pending,
  };
};
