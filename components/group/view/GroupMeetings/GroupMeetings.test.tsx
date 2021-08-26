import { renderBeforeEach, screen } from 'testing/util';

import { GroupMeetings } from './GroupMeetings';

jest.mock('context/group');

describe('<GroupMeetings />', () => {
  renderBeforeEach(<GroupMeetings />);

  it('should render a heading', () => {
    expect(
      screen.getByRole('heading', { name: 'Video meetings' })
    ).toBeInTheDocument();
  });

  it('should render a placeholder alert', () => {
    expect(
      screen.getByRole('heading', { name: 'Your digital meeting point' })
    ).toBeInTheDocument();
  });
});
