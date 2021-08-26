import { apollo, groupContext, renderBeforeEach, screen } from 'testing/util';
import { group } from 'testing/data';

import { GroupMembersInvites } from './GroupMembersInvites';

jest.mock('context/group');

describe('<GroupMembersInvites />', () => {
  beforeAll(() => {
    apollo.response = {
      group,
    };
  });

  renderBeforeEach(<GroupMembersInvites />);

  it('should render a heading', () => {
    expect(
      screen.getByRole('heading', { name: 'Invites' })
    ).toBeInTheDocument();
  });

  it('should render the invites as list items', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      group.managesMembershipInvite.count
    );
  });

  describe('for admins', () => {
    beforeAll(() => {
      groupContext.viewerRole = 'admin';
    });

    it('should render a create button', () => {
      expect(
        screen.getByRole('button', { name: 'Add members' })
      ).toBeInTheDocument();
    });
  });
});
