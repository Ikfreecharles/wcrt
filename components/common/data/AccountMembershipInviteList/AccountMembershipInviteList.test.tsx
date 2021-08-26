import dayjs from 'dayjs';

import {
  renderBeforeEach,
  screen,
  apollo,
  getEntityConnection,
  userEvent,
  submit,
  enqueueSnackbar,
  act,
} from 'testing/util';
import { newMembershipInvite } from 'testing/data';

import { AccountMembershipInviteList } from './AccountMembershipInviteList';

jest.mock('hooks/membership');

describe('<AccountMembershipInviteList />', () => {
  const inviteConnection = getEntityConnection(newMembershipInvite);

  beforeAll(() => {
    apollo.response = {
      me: {
        receives: { ...inviteConnection },
      },
    };
  });

  renderBeforeEach(<AccountMembershipInviteList />);

  it('should render a list item for each invite', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      inviteConnection.edges.length
    );
  });

  it('should render the title of each inviting group', () => {
    inviteConnection.edges.forEach(({ node }) => {
      expect(screen.getByText(node.managedBy!.name)).toBeInTheDocument();
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

  it('should render an accept button for each invite', () => {
    expect(screen.getAllByRole('button', { name: 'Accept' })).toHaveLength(
      inviteConnection.edges.length
    );
  });

  describe('on accept button click', () => {
    beforeEach(async () => {
      await act(async () => {
        userEvent.click(screen.getAllByRole('button', { name: 'Accept' })[0]);
      });
    });

    it('should accept an invite', () => {
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith(
        'response',
        inviteConnection.edges[0].node.id,
        true
      );
    });

    it('should trigger a notification', () => {
      expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
      expect(enqueueSnackbar).toHaveBeenCalledWith('Invite accepted.');
    });
  });

  it('should render a decline button for each invite', () => {
    expect(screen.getAllByRole('button', { name: 'Decline' })).toHaveLength(
      inviteConnection.edges.length
    );
  });

  describe('on decline button click', () => {
    beforeEach(async () => {
      await act(async () => {
        userEvent.click(screen.getAllByRole('button', { name: 'Decline' })[0]);
      });
    });

    it('should accept an invite', () => {
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith(
        'response',
        inviteConnection.edges[0].node.id,
        false
      );
    });

    it('should trigger a notification', () => {
      expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
      expect(enqueueSnackbar).toHaveBeenCalledWith('Invite declined.');
    });
  });
});
