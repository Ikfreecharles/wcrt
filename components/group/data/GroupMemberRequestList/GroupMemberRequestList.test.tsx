import dayjs from 'dayjs';

import {
  renderBeforeEach,
  screen,
  apollo,
  getEntityConnection,
  groupContext,
  act,
  userEvent,
  submit,
  enqueueSnackbar,
} from 'testing/util';
import { newMembershipRequest } from 'testing/data';

import { GroupMemberRequestList } from './GroupMemberRequestList';

jest.mock('context/group');
jest.mock('hooks/membership');

describe('<GroupMemberRequestList />', () => {
  const requestConnection = getEntityConnection(newMembershipRequest, 4);

  beforeAll(() => {
    apollo.response = {
      group: {
        receives: { ...requestConnection },
      },
    };
  });

  renderBeforeEach(<GroupMemberRequestList />);

  it('should render a list item for each request', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      requestConnection.edges.length
    );
  });

  it('should render the avatar of each requesting person', () => {
    requestConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByRole('img', { name: node.ownedBy!.represents!.name })
      ).toBeInTheDocument();
    });
  });

  it('should render the name of each requesting person', () => {
    requestConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByText(node.ownedBy!.represents!.name)
      ).toBeInTheDocument();
    });
  });

  it('should render the formatted timestamp of each request', () => {
    requestConnection.edges.forEach(({ node }) => {
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

    it('should render an accept button for each request', () => {
      expect(screen.getAllByRole('button', { name: 'Accept' })).toHaveLength(
        requestConnection.edges.length
      );
    });

    describe('on accept button click', () => {
      beforeEach(async () => {
        await act(async () => {
          userEvent.click(screen.getAllByRole('button', { name: 'Accept' })[0]);
        });
      });

      it('should accept an request', () => {
        expect(submit).toHaveBeenCalledTimes(1);
        expect(submit).toHaveBeenCalledWith(
          'response',
          requestConnection.edges[0].node.id,
          true
        );
      });

      it('should trigger a notification', () => {
        expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledWith('Request accepted.');
      });
    });

    it('should render a decline button for each request', () => {
      expect(screen.getAllByRole('button', { name: 'Decline' })).toHaveLength(
        requestConnection.edges.length
      );
    });

    describe('on decline button click', () => {
      beforeEach(async () => {
        await act(async () => {
          userEvent.click(
            screen.getAllByRole('button', { name: 'Decline' })[0]
          );
        });
      });

      it('should accept an request', () => {
        expect(submit).toHaveBeenCalledTimes(1);
        expect(submit).toHaveBeenCalledWith(
          'response',
          requestConnection.edges[0].node.id,
          false
        );
      });

      it('should trigger a notification', () => {
        expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledWith('Request declined.');
      });
    });
  });
});
