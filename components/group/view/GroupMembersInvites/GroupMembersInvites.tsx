import { useContext } from 'react';
import { BiUserPlus } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { GroupContext } from 'context/group';
import { GroupWindow } from 'components/group/misc';
import { GroupMemberInviteList } from 'components/group/data';
import { GroupEntityCreateButton } from 'components/group/control';

/**
 * Renders an overview of open group member invites. Meant to be used within a
 * group context.
 */
export const GroupMembersInvites: React.FC = () => {
  const { t } = useTranslation();
  const { viewerRole } = useContext(GroupContext);

  return (
    <GroupWindow
      title={t('label.invites')}
      footer={
        viewerRole === 'admin' && (
          <GroupEntityCreateButton
            icon={BiUserPlus}
            label={t('group:action.addMembers')}
            href="/members/add"
          />
        )
      }
      noPadding
      bottomGutter={11}
    >
      <GroupMemberInviteList />
    </GroupWindow>
  );
};
