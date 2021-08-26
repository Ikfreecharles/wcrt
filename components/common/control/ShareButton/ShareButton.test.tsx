import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { ShareButton } from './ShareButton';

describe('<ShareButton />', () => {
  renderBeforeEach(<ShareButton />);

  it('should render a button', () => {
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });

  it('should render a menu on click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Share' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });
});
