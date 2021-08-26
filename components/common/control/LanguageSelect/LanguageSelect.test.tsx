import { renderBeforeEach, screen, userEvent, settings } from 'testing/util';
import { i18nConfig } from 'lib/i18n';

import { LanguageSelect } from './LanguageSelect';

jest.mock('hooks/settings');

describe('<LanguageSelect />', () => {
  beforeAll(() => {
    settings.state = {
      language: 'en',
    };
  });

  renderBeforeEach(<LanguageSelect />);

  it('should render the current language as button', () => {
    expect(
      screen.getByRole('button', { name: 'Language English' })
    ).toBeInTheDocument();
  });

  it('should render all language options on click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Language English' }));
    expect(screen.getAllByRole('option')).toHaveLength(
      i18nConfig.i18n.locales.length
    );
  });

  it('should update the language on click', () => {
    userEvent.click(screen.getByRole('button', { name: 'Language English' }));
    userEvent.click(screen.getByRole('option', { name: 'Deutsch' }));
    expect(settings.setState).toHaveBeenCalledTimes(1);
    expect(settings.setState).toHaveBeenCalledWith({
      language: 'de',
    });
  });
});
