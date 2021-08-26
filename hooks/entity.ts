import { useContext } from 'react';

import {
  useArticleDeleteMutation,
  useCommentDeleteMutation,
  useCommentRatingDeleteMutation,
  useContentRatingDeleteMutation,
  useGroupDeleteMutation,
  useImpulseDeleteMutation,
  useMembershipDeleteMutation,
  useMembershipInviteDeleteMutation,
  useMembershipRequestDeleteMutation,
  useTaskDeleteMutation,
} from 'lib/graphql';
import { GroupContext } from 'context/group';
import { useProfile } from 'hooks/profile';
import { removeFromConnectionStore } from 'util/cache';

/**
 * Returns an universal function to delete various entities via GraphQL. Depends
 * on the ID to determine the entity type.
 */
export const useEntityDelete = () => {
  const viewerProfile = useProfile();
  const { groupId } = useContext(GroupContext);

  const [deleteArticle] = useArticleDeleteMutation();
  const [deleteComment] = useCommentDeleteMutation();
  const [deleteCommentRating] = useCommentRatingDeleteMutation();
  const [deleteContentRating] = useContentRatingDeleteMutation();
  const [deleteGroup] = useGroupDeleteMutation();
  const [deleteImpulse] = useImpulseDeleteMutation();
  const [deleteMembership] = useMembershipDeleteMutation();
  const [deleteMembershipInvite] = useMembershipInviteDeleteMutation();
  const [deleteMembershipRequest] = useMembershipRequestDeleteMutation();
  const [deleteTask] = useTaskDeleteMutation();

  return (id: string) => {
    if (!viewerProfile) throw new Error('Missing account info');

    const type = id.split(':')[2];

    if (type === 'Article')
      return deleteArticle({
        variables: { article: id },
        update: (cache) => {
          cache.modify({
            id: groupId,
            fields: {
              managesContent: removeFromConnectionStore(id),
            },
          });
        },
      });

    if (type === 'Comment')
      return deleteComment({
        variables: { comment: id },
        update: (cache) => {
          cache.modify({
            id: viewerProfile.id,
            fields: {
              createsComment: removeFromConnectionStore(id),
            },
          });
        },
      });

    if (type === 'CommentRating')
      return deleteCommentRating({
        variables: { commentRating: id },
        update: (cache) => {
          cache.modify({
            id: viewerProfile.id,
            fields: {
              createsRating: removeFromConnectionStore(id),
            },
          });
        },
      });

    if (type === 'ContentRating')
      return deleteContentRating({
        variables: { contentRating: id },
        update: (cache) => {
          cache.modify({
            id: viewerProfile.id,
            fields: {
              createsRating: removeFromConnectionStore(id),
            },
          });
        },
      });

    if (type === 'Impulse')
      return deleteImpulse({
        variables: { impulse: id },
        update: (cache) => {
          cache.modify({
            id: viewerProfile.id,
            fields: {
              createsContent: removeFromConnectionStore(id),
            },
          });
        },
      });

    if (type === 'Membership')
      return deleteMembership({
        variables: { membership: id },
        update: (cache) => {
          // Remove the membership from the group.
          cache.modify({
            id: groupId,
            fields: {
              administeredBy: removeFromConnectionStore(id),
            },
          });

          // Remove the membership from my own account.
          cache.modify({
            id: viewerProfile.representedBy.id,
            fields: {
              ownsMembership: removeFromConnectionStore(id),
            },
          });
        },
      });

    if (type === 'MembershipInvite')
      return deleteMembershipInvite({
        variables: { membershipInvite: id },
        update: (cache) => {
          cache.modify({
            id: groupId,
            fields: {
              managesMembershipInvite: removeFromConnectionStore(id),
            },
          });
        },
      });

    if (type === 'MembershipRequest')
      return deleteMembershipRequest({
        variables: { membershipRequest: id },
        update: (cache) => {
          cache.modify({
            id: groupId,
            fields: {
              receives: removeFromConnectionStore(id),
            },
          });
        },
      });

    if (type === 'Task')
      return deleteTask({
        variables: { task: id },
        update: (cache) => {
          cache.modify({
            id: groupId,
            fields: {
              managesTask: removeFromConnectionStore(id),
            },
          });
        },
      });

    if (type === 'Group') return deleteGroup({ variables: { group: id } });

    throw new Error('Unknown entity type');
  };
};
