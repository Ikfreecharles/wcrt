import { useTranslation } from 'lib/i18n';
import { GroupWindow } from 'components/group/misc';
import { GroupMemberRequestList } from 'components/group/data';

/**
 * Renders an overview of open group membership requests. Meant to be used
 * within a group context.
 */
export const GroupMembersRequests: React.FC = () => {
  const { t } = useTranslation();

  return (
    <GroupWindow title={t('label.membershipRequests')} noPadding>
      <GroupMemberRequestList />
    </GroupWindow>
  );
};
