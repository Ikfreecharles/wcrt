import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { PermanentVideoMeeting } from './PermanentVideoMeeting';

describe('<PermanentVideoMeeting />', () => {
  const onMeetingEnd = jest.fn();

  renderBeforeEach(
    <PermanentVideoMeeting
      title="Sample meeting"
      room="sample-room"
      onMeetingEnd={onMeetingEnd}
    />
  );

  it('should render the title as heading', () => {
    expect(
      screen.getByRole('heading', { name: 'Sample meeting' })
    ).toBeInTheDocument();
  });

  it('should render a video meeting', () => {
    expect(screen.getByTestId('video-meeting')).toBeInTheDocument();
  });

  it('should render a minimize button', () => {
    expect(
      screen.getByRole('button', { name: 'Minimize' })
    ).toBeInTheDocument();
  });

  it('should minimize the meeting view on click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Minimize' }));
    expect(
      screen.getByRole('button', { name: 'Maximize' })
    ).toBeInTheDocument();
  });

  it('should render a meeting leave button', () => {
    expect(
      screen.getByRole('button', { name: 'Leave meeting' })
    ).toBeInTheDocument();
  });

  it('should trigger the meeting leave action on click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Leave meeting' }));
    expect(onMeetingEnd).toHaveBeenCalledTimes(1);
  });
});
