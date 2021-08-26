import {
  renderBeforeEach,
  screen,
  userEvent,
  settings,
  auth,
} from 'testing/util';

import { MobileHeader } from './MobileHeader';

jest.mock('hooks/profile');
jest.mock('hooks/settings');

describe('<MobileHeader />', () => {
  renderBeforeEach(<MobileHeader />);

  describe('expanded', () => {
    it('should render the logo', () => {
      expect(
        screen.getByRole('heading', { name: 'We Create' })
      ).toBeInTheDocument();
    });

    it('should render the welcome text', () => {
      expect(screen.getByText(/Welcome!/)).toBeInTheDocument();
    });

    it('should render a support button', () => {
      expect(
        screen.getByRole('link', { name: 'Learn more' })
      ).toBeInTheDocument();
    });

    it('should render a collapse button', () => {
      expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument();
    });

    it('should collapse on collapse button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Close' }));
      expect(settings.setState).toHaveBeenCalledTimes(1);
      expect(settings.setState).toHaveBeenCalledWith({
        headerState: 'collapsed',
      });
    });
  });

  describe('collapsed', () => {
    beforeAll(() => {
      settings.state = {
        headerState: 'collapsed',
      };
    });

    it('should not render the site name', () => {
      expect(
        screen.queryByRole('heading', { name: 'We Create' })
      ).not.toBeInTheDocument();
    });

    it('should render a login button', () => {
      expect(
        screen.getByRole('button', { name: 'Sign in' })
      ).toBeInTheDocument();
    });

    it('should render a settings button', () => {
      expect(
        screen.getByRole('button', { name: 'Display' })
      ).toBeInTheDocument();
    });

    it('should render an expansion button', () => {
      expect(screen.getByRole('button', { name: 'About' })).toBeInTheDocument();
    });

    it('should expand on expansion button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'About' }));
      expect(settings.setState).toHaveBeenCalledTimes(1);
      expect(settings.setState).toHaveBeenCalledWith({
        headerState: 'expanded',
      });
    });
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
