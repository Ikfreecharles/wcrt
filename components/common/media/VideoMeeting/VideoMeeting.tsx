import { useRouter } from 'next/router';
import Jitsi from 'react-jitsi';

import { InlineProgress } from 'components/common/misc';
import { useProfile } from 'hooks/profile';
import { Box } from '@material-ui/core';

type Props = {
  /** The name of the Jitsi meeting room */
  room: string;
};

/** Renders a video meeting window, which is basically an embedded Jitsi room. */
export const VideoMeeting: React.FC<Props> = ({ room }) => {
  const { locale } = useRouter();
  const viewerProfile = useProfile();

  return (
    <Box
      width="100%"
      height="100%"
      data-testid="video-meeting"
      // Force re-rendering on room name change
      key={room}
    >
      <Jitsi
        roomName={room}
        loadingComponent={InlineProgress}
        displayName={viewerProfile?.name}
        config={{
          defaultLanguage: locale,
          // @ts-ignore
          toolbarButtons: [
            'microphone',
            'camera',
            'desktop',
            'fullscreen',
            'fodeviceselection',
            'recording',
            'sharedvideo',
            'shareaudio',
            'raisehand',
            'videoquality',
            'filmstrip',
            'shortcuts',
            'tileview',
            'select-background',
            'mute-everyone',
            'mute-video-everyone',
          ],
          // @ts-ignore
          prejoinPageEnabled: false,
          disableDeepLinking: true,
          hideConferenceSubject: true,
          disableThirdPartyRequests: true,
        }}
        containerStyle={{
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};
