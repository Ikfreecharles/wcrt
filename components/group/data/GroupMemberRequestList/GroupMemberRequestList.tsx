import { useContext, useState } from 'react';
import { ListItemAvatar } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { BiCheck, BiX } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { useGroupMembershipRequestsQuery } from 'lib/graphql';
import { GroupContext } from 'context/group';
import { useMembershipRequestResponse } from 'hooks/membership';
import { getEntityPath } from 'util/url';
import { getPaginationProps } from 'util/graphql';
import { EntityList } from 'components/common/data';
import { Avatar } from 'components/network/profile';
import { IconButton } from 'components/common/control';

/**
 * Renders an entity list prepopulated with the membership requests of a group.
 * Meant to be used within a group context.
 */
export const GroupMemberRequestList: React.FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { groupId, viewerRole } = useContext(GroupContext);
  const respondRequest = useMembershipRequestResponse();
  const { loading, data, fetchMore } = useGroupMembershipRequestsQuery({
    notifyOnNetworkStatusChange: true,
    variables: {
      id: groupId,
    },
  });
  const [submitting, setSubmitting] = useState(false);

  const listItems =
    data?.group?.receives.edges
      .map((edge) => edge.node)
      .map(({ id, createdAt, ownedBy }) => ({
        id,
        leadingElement: (
          <ListItemAvatar>
            <Avatar data={ownedBy?.represents} />
          </ListItemAvatar>
        ),
        title: ownedBy?.represents?.name,
        subtitle: t('format.dateTime', {
          date: createdAt,
        }),
        url: ownedBy?.represents
          ? getEntityPath(ownedBy.represents.id)
          : undefined,
      })) || [];

  const createConfirmClickHandler = (id: string) => async () => {
    setSubmitting(true);

    try {
      await respondRequest(id, true);
      enqueueSnackbar(t('notice.requestAccepted'));
    } catch {
      enqueueSnackbar(t('notice.requestNotAccepted'), { variant: 'error' });
    }

    setSubmitting(false);
  };

  const createDeclineClickHandler = (id: string) => async () => {
    setSubmitting(true);

    try {
      await respondRequest(id, false);
      enqueueSnackbar(t('notice.requestDeclined'));
    } catch {
      enqueueSnackbar(t('notice.requestNotDeclined'), { variant: 'error' });
    }

    setSubmitting(false);
  };

  return (
    <EntityList
      items={listItems}
      pagination={getPaginationProps(data?.group?.receives, {
        loading,
        fetchMore,
      })}
      loadingSkeleton
      createCustomAction={(id: string) =>
        viewerRole === 'admin' && (
          <>
            <IconButton
              title={t('action.accept')}
              icon={BiCheck}
              color="secondary"
              edge="end"
              onClick={createConfirmClickHandler(id)}
              disabled={submitting}
            />

            <IconButton
              title={t('action.decline')}
              icon={BiX}
              color="error"
              edge="end"
              onClick={createDeclineClickHandler(id)}
              disabled={submitting}
            />
          </>
        )
      }
    />
  );
};
