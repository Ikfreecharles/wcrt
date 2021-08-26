import { CommentFormData } from 'types';
import { useCommentCreateMutation, CommentFragmentDoc } from 'lib/graphql';
import { useProfile } from 'hooks/profile';
import { modifyStoreFieldCount, addToConnectionStore } from 'util/cache';

/** Returns a function to create a new comment via GraphQL. */
export const useCommentSubmit = () => {
  const viewerProfile = useProfile();

  const [createComment] = useCommentCreateMutation();

  const createNewComment = async (contentId: string, data: CommentFormData) => {
    if (!viewerProfile) throw new Error('Missing account info');

    const { data: createResult } = await createComment({
      variables: {
        text: data.text,
        agent: viewerProfile.id,
        content: contentId,
      },
      update: (cache, { data }) => {
        cache.modify({
          id: contentId,
          fields: {
            commentedBy: addToConnectionStore(
              cache.writeFragment({
                fragment: CommentFragmentDoc,
                fragmentName: 'Comment',
                data: data?.commentCreate,
              }),
              'CommentEdge',
              true
            ),
            _viewer: modifyStoreFieldCount('commentedBy', +1),
          },
        });
      },
    });

    if (!createResult) throw new Error('Missing mutation response');

    return createResult.commentCreate.id;
  };

  return createNewComment;
};
