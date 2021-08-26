import { useContext } from 'react';
import { Box } from '@material-ui/core';
import { BiCoffee } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { GroupContext } from 'context/group';
import { GroupWindow } from 'components/group/misc';
import { Chat } from 'components/common/data';
import { ChatPanel } from 'components/common/control';
import { Alert } from 'components/common/misc';

/** Renders the group chat view. Meant to be used within a group context. */
export const GroupChat: React.FC = () => {
  const { t } = useTranslation();
  const { chatChannel } = useContext(GroupContext);

  return (
    <GroupWindow
      title={t('group:tool.chat.title')}
      footer={chatChannel ? <ChatPanel channelId={chatChannel} /> : undefined}
      noPadding
    >
      {chatChannel ? (
        <Chat channelId={chatChannel} />
      ) : (
        <Box p={2}>
          <Alert
            type="remoteError"
            icon={BiCoffee}
            title={t('group:placeholder.chat.title')}
            message={t('group:placeholder.chat.message')}
          />
        </Box>
      )}
    </GroupWindow>
  );
};
