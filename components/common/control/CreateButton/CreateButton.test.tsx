import {
  renderBeforeEach,
  screen,
  userEvent,
  auth,
  apollo,
  graphqlResponse,
} from 'testing/util';

import { CreateButton } from './CreateButton';

jest.mock('hooks/group');

describe('<CreateButton />', () => {
  describe('default', () => {
    renderBeforeEach(<CreateButton />);

    it('should render a create button', () => {
      expect(
        screen.getByRole('button', { name: 'Create' })
      ).toBeInTheDocument();
    });

    describe('unauthenticated', () => {
      it('should trigger the sign-in process on click', () => {
        userEvent.click(screen.getByRole('button', { name: 'Create' }));
        expect(auth.signIn).toHaveBeenCalledTimes(1);
      });
    });

    describe('authenticated', () => {
      beforeAll(() => {
        auth.session = auth.getActiveSession();
        apollo.response = {
          ...graphqlResponse.categories,
          ...graphqlResponse.addresses,
        };
      });

      it('should open an option menu on click', () => {
        userEvent.click(screen.getByRole('button', { name: 'Create' }));
        expect(
          screen.getByRole('menuitem', { name: 'Impulse' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('menuitem', { name: 'Group' })
        ).toBeInTheDocument();
      });

      it('should open a dialog on impulse option click', () => {
        userEvent.click(screen.getByRole('button', { name: 'Create' }));
        userEvent.click(screen.getByRole('menuitem', { name: 'Impulse' }));
        expect(
          screen.getByRole('dialog', { name: 'Create new impulse' })
        ).toBeInTheDocument();
      });

      it('should open a dialog on group option click', () => {
        userEvent.click(screen.getByRole('button', { name: 'Create' }));
        userEvent.click(screen.getByRole('menuitem', { name: 'Group' }));
        expect(
          screen.getByRole('dialog', { name: 'Create new group' })
        ).toBeInTheDocument();
      });
    });
  });

  describe('extended', () => {
    renderBeforeEach(<CreateButton extended />);

    it('should render a text label', () => {
      expect(screen.getByRole('button', { name: 'Create' })).toHaveTextContent(
        'Create'
      );
    });
  });
});
