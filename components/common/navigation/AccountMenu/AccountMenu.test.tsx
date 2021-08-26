import { renderBeforeEach, screen, userEvent, auth } from 'testing/util';

import { AccountMenu } from './AccountMenu';

jest.mock('hooks/profile');

describe('<AccountMenu />', () => {
  beforeAll(() => {
    auth.session = auth.getActiveSession();
  });

  renderBeforeEach(<AccountMenu />);

  it('should render the user avatar', () => {
    expect(
      screen.getByRole('img', { name: 'Sample user' })
    ).toBeInTheDocument();
  });

  it('should render a menu on click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Sample user' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('should render a profile link within its menu', () => {
    userEvent.click(screen.getByRole('button', { name: 'Sample user' }));
    expect(
      screen.getByRole('menuitem', { name: 'My profile' })
    ).toBeInTheDocument();
  });

  it('should render a personal data link within its menu', () => {
    userEvent.click(screen.getByRole('button', { name: 'Sample user' }));
    expect(
      screen.getByRole('menuitem', { name: 'Settings' })
    ).toBeInTheDocument();
  });

  it('should render a settings button within its menu', () => {
    userEvent.click(screen.getByRole('button', { name: 'Sample user' }));
    userEvent.click(screen.getByRole('menuitem', { name: 'Display' }));
    expect(screen.getByRole('dialog', { name: 'Display' })).toBeInTheDocument();
  });

  it('should render a logout button within its menu', () => {
    userEvent.click(screen.getByRole('button', { name: 'Sample user' }));
    userEvent.click(screen.getByRole('menuitem', { name: 'Sign out' }));
    expect(auth.signOut).toHaveBeenCalledTimes(1);
  });
});
