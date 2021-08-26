import { useApolloClient } from '@apollo/client';

import { ContentStateFragment, ContentStateFragmentDoc } from 'lib/graphql';

/**
 * Returns reactive variables to express the current interaction state between
 * me and a content entity.
 */
export const useContentState = (contentId: string) => {
  const apolloClient = useApolloClient();

  const data = apolloClient.readFragment<ContentStateFragment>({
    id: contentId,
    fragment: ContentStateFragmentDoc,
  });

  return {
    subscribed: false, // @todo
    supported: !!data?._viewer.ratedBy.count,
    commented: !!data?._viewer.commentedBy.count,
  };
};
