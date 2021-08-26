import { BiGhost } from 'react-icons/bi';

import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { ActionDisplay } from './ActionDisplay';

describe('<ActionDisplay />', () => {
  describe('default', () => {
    const callback = jest.fn();

    renderBeforeEach(
      <ActionDisplay
        icon={BiGhost}
        text="Sample text"
        buttonLabel="Sample button"
        buttonOnClick={callback}
      />
    );

    it('should render its text', () => {
      expect(screen.getByText('Sample text')).toBeInTheDocument();
    });

    it('should render a button', () => {
      expect(
        screen.getByRole('button', { name: 'Sample button' })
      ).toBeInTheDocument();
    });

    it('should trigger its callback on click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Sample button' }));
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('disabled', () => {
    renderBeforeEach(
      <ActionDisplay
        icon={BiGhost}
        text="Sample text"
        buttonLabel="Sample button"
        banner="Disabled"
      />
    );

    it('should render its banner text', () => {
      expect(screen.getByText('Disabled')).toBeInTheDocument();
    });

    it('should render a disabled button', () => {
      expect(
        screen.getByRole('button', { name: 'Sample button' })
      ).toBeDisabled();
    });
  });
});
