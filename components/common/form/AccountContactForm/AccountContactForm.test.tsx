import {
  renderBeforeEach,
  screen,
  userEvent,
  fireEvent,
  act,
  submit,
  apollo,
  graphqlResponse,
} from 'testing/util';

import { AccountContactForm } from './AccountContactForm';

jest.mock('hooks/account');

describe('<AccountContactForm />', () => {
  const setStatus = jest.fn();

  beforeAll(() => {
    apollo.response = { ...graphqlResponse.accountInfo };
  });

  renderBeforeEach(
    <AccountContactForm mode="onChange" setStatus={setStatus} id="form-123" />
  );

  it('should render a form', () => {
    expect(screen.getByRole('form', { name: 'Contact' })).toBeInTheDocument();
  });

  it('should render its form elements', () => {
    expect(
      screen.getByRole('textbox', { name: 'Email address' })
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Current password')).toBeInTheDocument();
  });

  it('should render its default values', () => {
    expect(screen.getByRole('textbox', { name: 'Email address' })).toHaveValue(
      'test@example.com'
    );
  });

  it('should update the account contact details on submit', async () => {
    userEvent.clear(screen.getByRole('textbox', { name: 'Email address' }));
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Email address' }),
      'new@example.com',
      { delay: 1 }
    );
    await userEvent.type(screen.getByLabelText('Current password'), '123', {
      delay: 1,
    });
    await act(async () => {
      fireEvent.submit(screen.getByRole('form', { name: 'Contact' }));
    });
    expect(setStatus).toHaveBeenCalledWith('submitting');
    expect(setStatus).toHaveBeenCalledWith('completed');
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith('accountContact', {
      email: 'new@example.com',
      currentPassword: '123',
    });
  });
});
