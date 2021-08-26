import { renderBeforeEach, screen, settings, auth } from 'testing/util';

import { DesktopHeader } from './DesktopHeader';

jest.mock('hooks/profile');
jest.mock('hooks/settings');

describe('<DesktopHeader />', () => {
  beforeAll(() => {
    settings.state = {
      language: 'en',
      paletteType: 'dark',
    };
  });

  renderBeforeEach(<DesktopHeader />);

  it('should render a language select button', () => {
    expect(
      screen.getByRole('button', { name: 'Language English' })
    ).toBeInTheDocument();
  });

  it('should render a login button', () => {
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('should render a button for toggeling the palette type', () => {
    expect(
      screen.getByRole('button', { name: 'Light mode' })
    ).toBeInTheDocument();
  });

  it('should render a search input', () => {
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  describe('authenticated', () => {
    beforeAll(() => {
      auth.session = auth.getActiveSession();
    });

    it('should render a feedback button', () => {
      expect(
        screen.getByRole('button', { name: 'Give feedback' })
      ).toBeInTheDocument();
    });

    it('should render an account menu button', () => {
      expect(
        screen.getByRole('button', { name: 'Sample user' })
      ).toBeInTheDocument();
    });
  });
});
