import { renderBeforeEach, screen, routerPush, userEvent } from 'testing/util';

import { MobileNavigation } from './MobileNavigation';

describe('<MobileNavigation />', () => {
  renderBeforeEach(<MobileNavigation />);

  it('should render the main navigation links', () => {
    expect(screen.getByRole('button', { name: 'Network' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Groups' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Personal' })
    ).toBeInTheDocument();
  });

  it('should highlight the active page', () => {
    expect(screen.getByRole('button', { name: 'Network' })).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('should navigate to new route on click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Groups' }));
    expect(routerPush).toHaveBeenCalledTimes(1);
    expect(routerPush).toHaveBeenCalledWith('/groups');
  });
});
