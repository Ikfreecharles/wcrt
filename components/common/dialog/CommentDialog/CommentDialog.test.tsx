import {
  renderBeforeEach,
  screen,
  formStatus,
  enqueueSnackbar,
} from 'testing/util';

import { CommentDialog } from './CommentDialog';

jest.mock('hooks/form');

describe('<CommentDialog />', () => {
  const setOpen = jest.fn();

  renderBeforeEach(
    <CommentDialog contentId="T:123:Impulse" open setOpen={setOpen} />
  );

  it('should render a dialog', () => {
    expect(screen.getByRole('dialog', { name: 'Reply' })).toBeInTheDocument();
  });

  it('should render an explanation text', () => {
    expect(
      screen.getByText(/With a reply you can suggest a solution/)
    ).toBeInTheDocument();
  });

  it('should render the comment form', () => {
    expect(screen.getByRole('form', { name: 'Reply' })).toBeInTheDocument();
  });

  it('should render a submit button', () => {
    expect(screen.getByRole('button', { name: 'Reply' })).toBeInTheDocument();
  });

  it('should disable the submit button initially', () => {
    expect(screen.getByRole('button', { name: 'Reply' })).toBeDisabled();
  });

  describe('valid form', () => {
    beforeAll(() => {
      formStatus.formStatus = 'valid';
    });

    it('should enable the submit button', () => {
      expect(screen.getByRole('button', { name: 'Reply' })).not.toBeDisabled();
    });
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
      expect(enqueueSnackbar).toHaveBeenCalledWith('Reply published.');
    });
  });
});
