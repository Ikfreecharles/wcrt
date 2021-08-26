import {
  renderBeforeEach,
  screen,
  apollo,
  graphqlResponse,
  userEvent,
  enqueueSnackbar,
  act,
  submit,
} from 'testing/util';
import { group } from 'testing/data';

import { GroupSettings } from './GroupSettings';

jest.mock('context/group');
jest.mock('hooks/group');
jest.mock('hooks/entity');

describe('<GroupSettings />', () => {
  beforeAll(() => {
    apollo.response = {
      ...graphqlResponse.categories,
      ...graphqlResponse.addresses,
      group,
    };
  });

  renderBeforeEach(<GroupSettings />);

  it('should render a heading', () => {
    expect(
      screen.getByRole('heading', { name: 'Group settings' })
    ).toBeInTheDocument();
  });

  it('should render the group form', () => {
    expect(
      screen.getByRole('form', { name: 'Edit group' })
    ).toBeInTheDocument();
  });

  it('should render a save button', () => {
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('should render a delete button', () => {
    expect(
      screen.getByRole('button', { name: 'Delete group' })
    ).toBeInTheDocument();
  });

  describe('on save button click', () => {
    beforeEach(async () => {
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: 'Save' }));
      });
    });

    it('should submit the form', () => {
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith('T:123:Group', expect.anything());
    });

    it('should trigger a notification', () => {
      expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
      expect(enqueueSnackbar).toHaveBeenCalledWith('Changes saved.');
    });
  });

  describe('on delete button click', () => {
    beforeEach(() => {
      userEvent.click(screen.getByRole('button', { name: 'Delete group' }));
    });

    it('should render a confirm dialog', () => {
      expect(
        screen.getByRole('dialog', { name: 'Confirmation' })
      ).toBeInTheDocument();
    });

    describe('on confirm button click', () => {
      beforeEach(() => {
        userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
      });

      it('should trigger a delete', () => {
        expect(submit).toHaveBeenCalledTimes(1);
        expect(submit).toHaveBeenCalledWith('delete', 'T:123:Group');
      });

      it('should trigger a notification', () => {
        expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
        expect(enqueueSnackbar).toHaveBeenCalledWith('Group deleted.');
      });
    });
  });
});
