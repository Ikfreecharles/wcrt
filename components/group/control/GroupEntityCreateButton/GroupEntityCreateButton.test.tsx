import { renderBeforeEach, routerPush, screen, userEvent } from 'testing/util';

import { GroupEntityCreateButton } from './GroupEntityCreateButton';

jest.mock('context/group');

describe('<GroupEntityCreateButton />', () => {
  describe('default', () => {
    const onClick = jest.fn();

    renderBeforeEach(
      <GroupEntityCreateButton label="Sample label" onClick={onClick} />
    );

    it('should render a button', () => {
      expect(
        screen.getByRole('button', { name: 'Sample label' })
      ).toBeInTheDocument();
    });

    it('should trigger an action on click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Sample label' }));
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('link', () => {
    renderBeforeEach(
      <GroupEntityCreateButton label="Sample label" href="/something" />
    );

    it('should trigger an action on click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Sample label' }));
      expect(routerPush).toHaveBeenCalledTimes(1);
      expect(routerPush).toHaveBeenCalledWith('/groups/123/something');
    });
  });
});
