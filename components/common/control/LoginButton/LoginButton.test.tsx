import { renderBeforeEach, screen, userEvent, auth } from 'testing/util';

import { LoginButton } from './LoginButton';

describe('<LoginButton />', () => {
  renderBeforeEach(<LoginButton />);

  it('should render a login button', () => {
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should trigger the sign-in process on click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Sign in' }));
    expect(auth.signIn).toHaveBeenCalledTimes(1);
  });
});
