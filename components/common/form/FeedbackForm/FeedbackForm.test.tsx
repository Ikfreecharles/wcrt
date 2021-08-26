import {
  renderBeforeEach,
  screen,
  userEvent,
  fireEvent,
  act,
} from 'testing/util';

import { FeedbackForm } from './FeedbackForm';

describe('<FeedbackForm />', () => {
  const setStatus = jest.fn();

  renderBeforeEach(
    <FeedbackForm mode="onChange" setStatus={setStatus} id="form-123" />
  );

  it('should render a form', () => {
    expect(
      screen.getByRole('form', { name: 'Give feedback' })
    ).toBeInTheDocument();
  });

  it('should render its form elements', () => {
    expect(
      screen.getByRole('textbox', { name: 'Write message …' })
    ).toBeInTheDocument();
  });

  it('should trigger an API call on submit', async () => {
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Write message …' }),
      'Sample message',
      { delay: 1 }
    );
    await act(async () => {
      fireEvent.submit(screen.getByRole('form', { name: 'Give feedback' }));
    });
    expect(setStatus).toHaveBeenCalledWith('submitting');
    expect(setStatus).toHaveBeenCalledWith('completed');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('/api/send/feedback', {
      body: JSON.stringify({ text: 'Sample message' }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    });
  });
});
