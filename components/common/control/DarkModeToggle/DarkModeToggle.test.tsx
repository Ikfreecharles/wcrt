import { renderBeforeEach, screen, userEvent, settings } from 'testing/util';

import { DarkModeToggle } from './DarkModeToggle';

jest.mock('hooks/settings');

describe('<DarkModeToggle />', () => {
  beforeAll(() => {
    settings.state = {
      paletteType: 'dark',
    };
  });

  renderBeforeEach(<DarkModeToggle />);

  it('should render a button', () => {
    expect(
      screen.getByRole('button', { name: 'Light mode' })
    ).toBeInTheDocument();
  });

  it('should update the palette type on click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Light mode' }));
    expect(settings.setState).toHaveBeenCalledTimes(1);
    expect(settings.setState).toHaveBeenCalledWith({
      paletteType: 'light',
    });
  });
});
