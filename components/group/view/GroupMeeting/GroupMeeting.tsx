import { useContext } from 'react';
import kebabCase from 'lodash/kebabCase';

import { useTranslation } from 'lib/i18n';
import { GroupContext } from 'context/group';
import { GroupWindow } from 'components/group/misc';
import { VideoMeeting } from 'components/common/media';

type Props = {
  /** The meeting ID */
  id: string;
};

/**
 * Renders a group meeting view. This view is the mobile alternative to the
 * global video meeting layout used on large screens. Meant to be used within a
 * group context.
 */
export const GroupMeeting: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation();
  const { groupName } = useContext(GroupContext);

  return (
    <GroupWindow title={t('label.videoMeeting')} noPadding>
      <VideoMeeting room={`${id.split(':')[1]}/${kebabCase(groupName)}`} />
    </GroupWindow>
  );
};
