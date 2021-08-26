import {
  renderBeforeEach,
  screen,
  formStatus,
  enqueueSnackbar,
} from 'testing/util';

import { MembershipRequestDialog } from './MembershipRequestDialog';

jest.mock('hooks/form');

describe('<MembershipRequestDialog />', () => {
  const setOpen = jest.fn();

  renderBeforeEach(
    <MembershipRequestDialog groupId="T:123:Group" open setOpen={setOpen} />
  );

  it('should render a dialog', () => {
    expect(
      screen.getByRole('dialog', { name: 'Request membership' })
    ).toBeInTheDocument();
  });

  it('should render an explanation text', () => {
    expect(
      screen.getByText(/By submitting a membership request/)
    ).toBeInTheDocument();
  });

  it('should render the comment form', () => {
    expect(
      screen.getByRole('form', { name: 'Request membership' })
    ).toBeInTheDocument();
  });

  it('should render a submit button', () => {
    expect(screen.getByRole('button', { name: 'Send' })).toBeInTheDocument();
  });

  describe('completed form', () => {
    beforeAll(() => {
      formStatus.formStatus = 'completed';
    });

    it('should close the dialog', () => {
      expect(setOpen).toHaveBeenCalledTimes(1);
      expect(setOpen).toHaveBeenCalledWith(false);
    });

    it('should trigger a notification', () => {
      expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
      expect(enqueueSnackbar).toHaveBeenCalledWith('Membership requested.');
    });
  });
});
