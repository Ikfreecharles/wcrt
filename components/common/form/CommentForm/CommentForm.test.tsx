import {
  renderBeforeEach,
  screen,
  userEvent,
  fireEvent,
  act,
  submit,
} from 'testing/util';

import { CommentForm } from './CommentForm';

jest.mock('hooks/comment');

describe('<CommentForm />', () => {
  const setStatus = jest.fn();
  const setResult = jest.fn();

  renderBeforeEach(
    <CommentForm
      contentId="T:123:Article"
      mode="onChange"
      setStatus={setStatus}
      setResult={setResult}
      id="form-123"
    />
  );

  it('should render a form', () => {
    expect(screen.getByRole('form', { name: 'Reply' })).toBeInTheDocument();
  });

  it('should render its form elements', () => {
    expect(
      screen.getByRole('textbox', { name: 'Write reply …' })
    ).toBeInTheDocument();
  });

  it('should create a new comment on submit', async () => {
    await userEvent.type(
      screen.getByRole('textbox', { name: 'Write reply …' }),
      'Sample comment',
      { delay: 1 }
    );
    await act(async () => {
      fireEvent.submit(screen.getByRole('form', { name: 'Reply' }));
    });
    expect(setStatus).toHaveBeenCalledWith('submitting');
    expect(setStatus).toHaveBeenCalledWith('completed');
    expect(setResult).toHaveBeenCalledTimes(1);
    expect(setResult).toHaveBeenCalledWith({
      data: { commentId: 'T:123:Comment' },
    });
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith('comment', 'T:123:Article', {
      text: 'Sample comment',
    });
  });
});
