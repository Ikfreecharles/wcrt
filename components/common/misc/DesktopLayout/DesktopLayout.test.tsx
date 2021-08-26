import { useContext, useEffect } from 'react';

import { auth, renderBeforeEach, screen } from 'testing/util';
import { VideoMeetingContext } from 'context/videoMeeting';

import { DesktopLayout } from './DesktopLayout';

describe('<DesktopLayout />', () => {
  describe('default', () => {
    renderBeforeEach(<DesktopLayout />);

    it('should render the desktop controls', () => {
      expect(screen.queryAllByTestId('desktop')).toHaveLength(2);
    });

    it('should render a create button', () => {
      expect(
        screen.getByRole('button', { name: 'Create' })
      ).toBeInTheDocument();
    });

    it('should render the welcome text', () => {
      expect(screen.getByText(/Welcome!/)).toBeInTheDocument();
    });

    describe('authenticated', () => {
      beforeAll(() => {
        auth.session = auth.getActiveSession();
      });

      it('should not render the welcome text', () => {
        expect(screen.queryByText(/Welcome!/)).not.toBeInTheDocument();
      });
    });
  });

  describe('embedded', () => {
    renderBeforeEach(<DesktopLayout embedded />);

    it('should not render the desktop controls', () => {
      expect(screen.queryAllByTestId('desktop')).toHaveLength(0);
    });
  });

  describe('with active video meeting', () => {
    const VideoMeetingTrigger: React.FC = () => {
      const { startVideoMeeting } = useContext(VideoMeetingContext);

      useEffect(() => {
        startVideoMeeting({ title: 'Sample meeting', room: 'sample-room' });
      }, []);

      return <></>;
    };

    renderBeforeEach(
      <DesktopLayout>
        <VideoMeetingTrigger />
      </DesktopLayout>
    );

    it('should render a video meeting', () => {
      expect(screen.queryByTestId('video-meeting')).toBeInTheDocument();
    });
  });
});
