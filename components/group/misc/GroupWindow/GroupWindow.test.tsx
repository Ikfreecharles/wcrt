import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { GroupWindow } from './GroupWindow';

jest.mock('context/group');

describe('<GroupWindow />', () => {
  describe('default', () => {
    renderBeforeEach(
      <GroupWindow title="Sample title" footer="Sample footer">
        Sample content
      </GroupWindow>
    );

    it('should render the title as heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Sample title' })
      ).toBeInTheDocument();
    });

    it('should render a back button', () => {
      expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    });

    it('should render a menu button', () => {
      expect(
        screen.getByRole('button', { name: 'Group tools' })
      ).toBeInTheDocument();
    });

    it('should open the group menu on click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Group tools' }));
      expect(
        screen.getByRole('dialog', { name: 'Group tools' })
      ).toBeInTheDocument();
    });
  });
});
