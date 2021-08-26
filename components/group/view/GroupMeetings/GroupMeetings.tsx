import { useContext } from 'react';
import { Theme, useMediaQuery } from '@material-ui/core';
import kebabCase from 'lodash/kebabCase';

import { useTranslation } from 'lib/i18n';
import { VideoMeetingContext } from 'context/videoMeeting';
import { GroupWindow } from 'components/group/misc';
import { Alert } from 'components/common/misc';
import { GroupContext } from 'context/group';
import { getInternalPath } from 'util/url';

/** Renders an overview of the group meetings. Meant to be used within a group context. */
export const GroupMeetings: React.FC = () => {
  const { t } = useTranslation();
  const { groupId, groupName } = useContext(GroupContext);
  const { startVideoMeeting } = useContext(VideoMeetingContext);
  const isDesktop = useMediaQuery<Theme>(({ breakpoints }) =>
    breakpoints.up('md')
  );

  const handleMeetingStartClick = () =>
    startVideoMeeting({
      title: groupName,
      room: `${groupId.split(':')[1]}/${kebabCase(groupName)}`,
    });

  return (
    <GroupWindow title={t('group:tool.meetings.title')}>
      <Alert
        type="comeBackLater"
        title={t('group:placeholder.meetings.title')}
        message={t('group:placeholder.meetings.message')}
        buttonLabel={t('action.joinMeeting')}
        onClick={isDesktop ? handleMeetingStartClick : undefined}
        href={
          !isDesktop
            ? getInternalPath(groupId, `/meetings/${groupId.split(':')[1]}`)
            : undefined
        }
      />
    </GroupWindow>
  );
};
