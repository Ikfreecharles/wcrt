import { renderBeforeEach, screen } from 'testing/util';

import { WelcomeText } from './WelcomeText';

describe('<WelcomeText />', () => {
  renderBeforeEach(<WelcomeText />);

  it('should render the text', () => {
    expect(screen.getByText(/Welcome!/)).toBeInTheDocument();
    expect(screen.getByText(/Discover exciting ideas/)).toBeInTheDocument();
  });

  it('should render a button', () => {
    expect(
      screen.getByRole('link', { name: 'Learn more' })
    ).toBeInTheDocument();
  });
});
