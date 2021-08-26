import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { BiCheck, BiX } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { useMyMembershipInvitesQuery } from 'lib/graphql';
import { useMembershipInviteResponse } from 'hooks/membership';
import { getEntityPath } from 'util/url';
import { getPaginationProps } from 'util/graphql';
import { EntityList } from 'components/common/data';
import { IconButton } from 'components/common/control';

/**
 * Renders an entity list prepopulated with the membership invites associated
 * with my own account.
 */
export const AccountMembershipInviteList: React.FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const { loading, data, fetchMore } = useMyMembershipInvitesQuery({
    notifyOnNetworkStatusChange: true,
  });
  const respondInvite = useMembershipInviteResponse();
  const [submitting, setSubmitting] = useState(false);

  const listItems =
    data?.me.receives.edges
      .map((edge) => edge.node)
      .map(({ id, createdAt, managedBy }) => ({
        id: id,
        title: managedBy?.name,
        subtitle: t('format.dateTime', {
          date: createdAt,
        }),
        url: managedBy ? getEntityPath(managedBy.id) : undefined,
      })) || [];

  const createConfirmClickHandler = (id: string) => async () => {
    setSubmitting(true);

    try {
      await respondInvite(id, true);
      enqueueSnackbar(t('notice.inviteAccepted'));
    } catch {
      enqueueSnackbar(t('notice.inviteNotAccepted'), { variant: 'error' });
    }

    setSubmitting(false);
  };

  const createDeclineClickHandler = (id: string) => async () => {
    setSubmitting(true);

    try {
      await respondInvite(id, false);
      enqueueSnackbar(t('notice.inviteDeclined'));
    } catch {
      enqueueSnackbar(t('notice.inviteNotDeclined'), { variant: 'error' });
    }

    setSubmitting(false);
  };

  return (
    <EntityList
      items={listItems}
      pagination={getPaginationProps(data?.me.receives, {
        loading,
        fetchMore,
      })}
      createCustomAction={(id: string) => (
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
      )}
    />
  );
};
