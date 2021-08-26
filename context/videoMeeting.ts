import { createContext } from 'react';

import { VideoMeeting } from 'types';

type VideoMeetingContext = {
  startVideoMeeting: (videoMeeting: VideoMeeting) => void;
  endVideoMeeting: () => void;
};

/**
 * Shares the ability to start or end a global video meeting between the desktop
 * layout and the components.
 */
export const VideoMeetingContext = createContext<VideoMeetingContext>(
  {} as VideoMeetingContext
);

export const VideoMeetingProvider = VideoMeetingContext.Provider;
