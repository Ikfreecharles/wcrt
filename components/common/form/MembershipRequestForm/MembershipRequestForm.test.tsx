import {
  renderBeforeEach,
  screen,
  userEvent,
  fireEvent,
  act,
  submit,
} from 'testing/util';

import { MembershipRequestForm } from './MembershipRequestForm';

jest.mock('hooks/membership');

describe('<MembershipRequestForm />', () => {
  const setStatus = jest.fn();
  const setResult = jest.fn();

  renderBeforeEach(
    <MembershipRequestForm
      groupId="T:123:Group"
      mode="onChange"
      setStatus={setStatus}
      setResult={setResult}
      id="form-123"
    />
  );

  it('should render a form', () => {
    expect(
      screen.getByRole('form', { name: 'Request membership' })
    ).toBeInTheDocument();
  });

  it('should render its form elements', () => {
    expect(
      screen.getByRole('textbox', { name: 'Message' })
    ).toBeInTheDocument();
  });

  it('should create a new membership request on submit', async () => {
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Message' }),
      'Sample text',
      { delay: 1 }
    );
    await act(async () => {
      fireEvent.submit(
        screen.getByRole('form', { name: 'Request membership' })
      );
    });
    expect(setStatus).toHaveBeenCalledWith('submitting');
    expect(setStatus).toHaveBeenCalledWith('completed');
    expect(setResult).toHaveBeenCalledTimes(1);
    expect(setResult).toHaveBeenCalledWith({
      data: { requestId: 'T:123:MembershipRequest' },
    });
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith(
      'membershipRequest',
      'T:123:Group',
      'Sample text'
    );
  });
});
