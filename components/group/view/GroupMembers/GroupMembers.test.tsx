import { apollo, groupContext, renderBeforeEach, screen } from 'testing/util';
import { group } from 'testing/data';

import { GroupMembers } from './GroupMembers';

jest.mock('context/group');

describe('<GroupMembers />', () => {
  beforeAll(() => {
    apollo.response = {
      group,
    };
  });

  renderBeforeEach(<GroupMembers />);

  it('should render a heading', () => {
    expect(
      screen.getByRole('heading', { name: 'Members' })
    ).toBeInTheDocument();
  });

  it('should render the group contents as list items', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      group.administeredBy.count
    );
  });

  describe('for admins', () => {
    beforeAll(() => {
      groupContext.viewerRole = 'admin';
    });

    it('should render a link to the membership requests', () => {
      expect(
        screen.getByRole('link', {
          name:
            group.receives.count === 1
              ? '1 membership request'
              : `${group.receives.count} membership requests`,
        })
      ).toBeInTheDocument();
    });

    it('should render a link to the membership invites', () => {
      expect(
        screen.getByRole('link', {
          name:
            group.managesMembershipInvite.count === 1
              ? '1 invite'
              : `${group.managesMembershipInvite.count} invites`,
        })
      ).toBeInTheDocument();
    });

    it('should render a create button', () => {
      expect(
        screen.getByRole('button', { name: 'Add members' })
      ).toBeInTheDocument();
    });
  });
});
