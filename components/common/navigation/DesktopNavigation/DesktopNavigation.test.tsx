import { renderBeforeEach, screen } from 'testing/util';

import { DesktopNavigation } from './DesktopNavigation';

describe('<DesktopNavigation />', () => {
  renderBeforeEach(<DesktopNavigation />);

  it('should render the main navigation links', () => {
    expect(screen.getByRole('link', { name: 'Network' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Groups' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Personal' })).toBeInTheDocument();
  });

  it('should highlight the active page', () => {
    expect(screen.getByRole('link', { name: 'Network' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });
});
