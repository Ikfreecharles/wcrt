import {
  renderBeforeEach,
  screen,
  userEvent,
  fireEvent,
  act,
  submit,
} from 'testing/util';

import { AccountPasswordForm } from './AccountPasswordForm';

jest.mock('hooks/account');

describe('<AccountPasswordForm />', () => {
  const setStatus = jest.fn();

  renderBeforeEach(
    <AccountPasswordForm mode="onChange" setStatus={setStatus} id="form-123" />
  );

  it('should render a form', () => {
    expect(screen.getByRole('form', { name: 'Password' })).toBeInTheDocument();
  });

  it('should render its form elements', () => {
    expect(screen.getByLabelText('Current password')).toBeInTheDocument();
    expect(screen.getByLabelText('New password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm new password')).toBeInTheDocument();
  });

  it('should validate matching passwords', async () => {
    await userEvent.type(screen.getByLabelText('Current password'), '123', {
      delay: 1,
    });
    await userEvent.type(screen.getByLabelText('New password'), '456', {
      delay: 1,
    });
    await userEvent.type(screen.getByLabelText('Confirm new password'), '789', {
      delay: 1,
    });
    expect(setStatus).toHaveBeenLastCalledWith('invalid');
  });

  it('should update the account contact details on submit', async () => {
    await userEvent.type(screen.getByLabelText('Current password'), '123', {
      delay: 1,
    });
    await userEvent.type(screen.getByLabelText('New password'), '456', {
      delay: 1,
    });
    await userEvent.type(screen.getByLabelText('Confirm new password'), '456', {
      delay: 1,
    });
    await act(async () => {
      fireEvent.submit(screen.getByRole('form', { name: 'Password' }));
    });
    expect(setStatus).toHaveBeenCalledWith('submitting');
    expect(setStatus).toHaveBeenCalledWith('completed');
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith('accountPassword', {
      currentPassword: '123',
      newPassword: '456',
      passwordConfirmation: '456',
    });
  });
});
