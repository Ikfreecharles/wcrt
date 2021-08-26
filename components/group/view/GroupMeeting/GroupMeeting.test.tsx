import { renderBeforeEach, screen } from 'testing/util';

import { GroupMeeting } from './GroupMeeting';

jest.mock('context/group');

describe('<GroupMeeting />', () => {
  renderBeforeEach(<GroupMeeting id="T:123:Meeting" />);

  it('should render a heading', () => {
    expect(
      screen.getByRole('heading', { name: 'Video meeting' })
    ).toBeInTheDocument();
  });

  it('should render a video meeting', () => {
    expect(screen.getByTestId('video-meeting')).toBeInTheDocument();
  });
});
