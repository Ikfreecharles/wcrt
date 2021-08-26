import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { AppearanceSettingsButton } from './AppearanceSettingsButton';

describe('<AppearanceSettingsButton />', () => {
  renderBeforeEach(<AppearanceSettingsButton />);

  it('should render a button', () => {
    expect(screen.getByRole('button', { name: 'Display' })).toBeInTheDocument();
  });

  it('should open a dialog on click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Display' }));
    expect(screen.getByRole('dialog', { name: 'Display' })).toBeInTheDocument();
  });
});
