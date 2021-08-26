import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { FeedbackButton } from './FeedbackButton';

describe('<FeedbackButton />', () => {
  renderBeforeEach(<FeedbackButton />);

  it('should render a button', () => {
    expect(
      screen.getByRole('button', { name: 'Give feedback' })
    ).toBeInTheDocument();
  });

  it('should open a dialog on click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Give feedback' }));
    expect(
      screen.getByRole('dialog', { name: 'Give feedback' })
    ).toBeInTheDocument();
  });
});
