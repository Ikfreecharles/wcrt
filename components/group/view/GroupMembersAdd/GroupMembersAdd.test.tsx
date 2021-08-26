import {
  renderBeforeEach,
  screen,
  apollo,
  userEvent,
  submit,
  enqueueSnackbar,
  routerPush,
} from 'testing/util';
import { person } from 'testing/data';

import { GroupMembersAdd } from './GroupMembersAdd';

jest.mock('context/group');
jest.mock('hooks/membership');

describe('<GroupMembersAdd />', () => {
  describe('without results', () => {
    beforeAll(() => {
      apollo.response = {
        persons: {
          edges: [],
        },
      };
    });

    renderBeforeEach(<GroupMembersAdd />);

    it('should render a heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Add members' })
      ).toBeInTheDocument();
    });

    it('should render a search input', () => {
      expect(
        screen.getByPlaceholderText('Search for persons …')
      ).toBeInTheDocument();
    });

    it('should render an empty state after typing', () => {
      userEvent.type(
        screen.getByPlaceholderText('Search for persons …'),
        'Sample search'
      );
      expect(
        screen.getByRole('heading', { name: 'Nothing found' })
      ).toBeInTheDocument();
    });
  });

  describe('with results', () => {
    beforeAll(() => {
      apollo.response = {
        persons: {
          edges: [
            {
              node: {
                ...person,
                representedBy: {
                  id: 'T:123:OnlineAccount',
                },
              },
            },
          ],
        },
      };
    });

    renderBeforeEach(<GroupMembersAdd />);

    beforeEach(() => {
      userEvent.type(
        screen.getByPlaceholderText('Search for persons …'),
        'Sample search'
      );
    });

    it('should render a person’s signature', () => {
      expect(screen.getByText(person.name)).toBeInTheDocument();
      expect(screen.getByText(person.info!)).toBeInTheDocument();
    });

    it('should render a button', () => {
      expect(
        screen.getByRole('button', { name: 'Invite' })
      ).toBeInTheDocument();
    });

    describe('on button click', () => {
      beforeEach(() => {
        userEvent.click(screen.getByRole('button', { name: 'Invite' }));
      });

      it('should create a new membership invite', () => {
        expect(submit).toHaveBeenCalledTimes(1);
        expect(submit).toHaveBeenCalledWith(
          'membershipInvite',
          'T:123:Group',
          'T:123:OnlineAccount'
        );
      });

      it('should trigger a notification', () => {
        expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledWith('Invite sent.');
      });

      it('should navigate to previous page', () => {
        expect(routerPush).toHaveBeenCalledTimes(1);
      });
    });
  });
});
