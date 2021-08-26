import { renderBeforeEach, screen } from 'testing/util';

import { VideoMeeting } from './VideoMeeting';

describe('<VideoMeeting />', () => {
  renderBeforeEach(<VideoMeeting room="sample-room" />);

  it('should render a video meeting implementation', () => {
    expect(screen.getByTestId('video-meeting')).toBeInTheDocument();
  });

  it('should render a loading indicator', () => {
    expect(
      screen.getByRole('progressbar', { name: 'Content is loading …' })
    ).toBeInTheDocument();
  });
});
