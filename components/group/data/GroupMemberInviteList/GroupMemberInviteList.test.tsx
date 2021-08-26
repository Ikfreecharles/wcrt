import dayjs from 'dayjs';

import {
  renderBeforeEach,
  screen,
  apollo,
  getEntityConnection,
  groupContext,
} from 'testing/util';
import { newMembershipInvite } from 'testing/data';

import { GroupMemberInviteList } from './GroupMemberInviteList';

jest.mock('context/group');

describe('<GroupMemberInviteList />', () => {
  const inviteConnection = getEntityConnection(newMembershipInvite, 4);

  beforeAll(() => {
    apollo.response = {
      group: {
        managesMembershipInvite: { ...inviteConnection },
      },
    };
  });

  renderBeforeEach(<GroupMemberInviteList />);

  it('should render a list item for each invite', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      inviteConnection.edges.length
    );
  });

  it('should render the avatar of each invited member', () => {
    inviteConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByRole('img', { name: node.receivedBy!.represents!.name })
      ).toBeInTheDocument();
    });
  });

  it('should render the name of each invited member', () => {
    inviteConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByText(node.receivedBy!.represents!.name)
      ).toBeInTheDocument();
    });
  });

  it('should render the formatted timestamp of each invite', () => {
    inviteConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByText(
          dayjs(node.createdAt).format('MMMM D, YYYY [at] h:mm A')
        )
      ).toBeInTheDocument();
    });
  });

  describe('for admins', () => {
    beforeAll(() => {
      groupContext.viewerRole = 'admin';
    });

    it('should render an delete button for each invite', () => {
      expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(
        inviteConnection.edges.length
      );
    });
  });
});
