import {
  renderBeforeEach,
  screen,
  apollo,
  graphqlResponse,
  userEvent,
} from 'testing/util';

import { EntityEditDialog } from './EntityEditDialog';

describe('<EntityEditDialog />', () => {
  const setOpen = jest.fn();

  describe('for an impulse', () => {
    beforeAll(() => {
      apollo.response = {
        ...graphqlResponse.categories,
        ...graphqlResponse.addresses,
      };
    });

    renderBeforeEach(
      <EntityEditDialog id="T:123:Impulse" open setOpen={setOpen} />
    );

    it('should render a dialog', () => {
      expect(
        screen.getByRole('dialog', { name: 'Edit impulse' })
      ).toBeInTheDocument();
    });

    it('should render the impulse form', () => {
      expect(
        screen.getByRole('form', { name: 'Edit impulse' })
      ).toBeInTheDocument();
    });

    it('should render a view link', () => {
      expect(screen.getByRole('link', { name: 'View' })).toBeInTheDocument();
    });

    it('should render a save button', () => {
      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
    });

    it('should render a cancel button', () => {
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeInTheDocument();
    });

    it('should close the dialog on cancel button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Cancel' }));
      expect(setOpen).toHaveBeenCalledTimes(1);
      expect(setOpen).toHaveBeenCalledWith(false);
    });
  });
});
