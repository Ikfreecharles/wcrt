import { apollo, renderBeforeEach, screen } from 'testing/util';
import { group } from 'testing/data';

import { GroupMembersRequests } from './GroupMembersRequests';

jest.mock('context/group');

describe('<GroupMembersRequests />', () => {
  beforeAll(() => {
    apollo.response = {
      group,
    };
  });

  renderBeforeEach(<GroupMembersRequests />);

  it('should render a heading', () => {
    expect(
      screen.getByRole('heading', { name: 'Membership requests' })
    ).toBeInTheDocument();
  });

  it('should render the invites as list items', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(group.receives.count);
  });
});
