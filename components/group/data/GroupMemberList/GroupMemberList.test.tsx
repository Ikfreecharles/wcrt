import {
  renderBeforeEach,
  screen,
  apollo,
  getEntityConnection,
  groupContext,
} from 'testing/util';
import { newMembership } from 'testing/data';

import { GroupMemberList } from './GroupMemberList';

jest.mock('context/group');

describe('<GroupMemberList />', () => {
  const membershipConnection = getEntityConnection(newMembership, 4);

  beforeAll(() => {
    apollo.response = {
      group: {
        administeredBy: { ...membershipConnection },
      },
    };
  });

  renderBeforeEach(<GroupMemberList />);

  it('should render a list item for each member', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      membershipConnection.edges.length
    );
  });

  it('should render the avatar of each member', () => {
    membershipConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByRole('img', { name: node.ownedBy!.represents!.name })
      ).toBeInTheDocument();
    });
  });

  it('should render the name of each member', () => {
    membershipConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByText(node.ownedBy!.represents!.name)
      ).toBeInTheDocument();
    });
  });

  it('should render the role of each member', () => {
    expect(screen.getAllByText('Member')).toHaveLength(
      membershipConnection.edges.length
    );
  });

  describe('for admins', () => {
    beforeAll(() => {
      groupContext.viewerRole = 'admin';
    });

    it('should render an delete button for each member', () => {
      expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(
        membershipConnection.edges.length
      );
    });
  });
});
