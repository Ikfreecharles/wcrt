import { renderBeforeEach, screen, userEvent, settings } from 'testing/util';
import { i18nConfig } from 'lib/i18n';

import { AppearanceSettingsDialog } from './AppearanceSettingsDialog';

jest.mock('hooks/settings');

describe('<AppearanceSettingsDialog />', () => {
  const setOpen = jest.fn();

  beforeAll(() => {
    settings.state = {
      language: 'en',
      paletteType: 'dark',
    };
  });

  renderBeforeEach(<AppearanceSettingsDialog open setOpen={setOpen} />);

  it('should render a dialog', () => {
    expect(screen.getByRole('dialog', { name: 'Display' })).toBeInTheDocument();
  });

  it('should render a language subheading', () => {
    expect(screen.getByText('Language')).toBeInTheDocument();
  });

  it('should render all languages as radios', () => {
    expect(screen.getAllByRole('radio')).toHaveLength(
      i18nConfig.i18n.locales.length
    );
  });

  it('should render the current language as checked', () => {
    expect(screen.getByRole('radio', { name: 'English' })).toBeChecked();
  });

  it('should update the language on click', () => {
    userEvent.click(screen.getByRole('radio', { name: 'Deutsch' }));
    expect(settings.setState).toHaveBeenCalledTimes(1);
    expect(settings.setState).toHaveBeenCalledWith({
      language: 'de',
    });
  });

  it('should render an appearance subheading', () => {
    expect(screen.getByText('Appearance')).toBeInTheDocument();
  });

  it('should render a switch for toggeling the palette type', () => {
    expect(
      screen.getByRole('checkbox', { name: 'Dark mode' })
    ).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: 'Dark mode' })).toBeChecked();
  });

  it('should update the palette type on click', () => {
    userEvent.click(screen.getByRole('checkbox', { name: 'Dark mode' }));
    expect(settings.setState).toHaveBeenCalledTimes(1);
    expect(settings.setState).toHaveBeenCalledWith({
      paletteType: 'light',
    });
  });
});
