import { BiGhost } from 'react-icons/bi';

import { renderBeforeEach, screen, userEvent } from 'testing/util';

import { SidebarWrapper } from './SidebarWrapper';

describe('<SidebarWrapper />', () => {
  describe('inline', () => {
    renderBeforeEach(
      <SidebarWrapper title="Sample title" label="Sample label" icon={BiGhost}>
        Sample content
      </SidebarWrapper>
    );

    it('should render its content', () => {
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });
  });

  describe('modal', () => {
    renderBeforeEach(
      <SidebarWrapper
        modal
        title="Sample title"
        label="Sample label"
        icon={BiGhost}
      >
        Sample content
      </SidebarWrapper>
    );

    it('should render its label as heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Sample label' })
      ).toBeInTheDocument();
    });

    it('should render a button for opening the modal', () => {
      expect(
        screen.getByRole('button', { name: 'Sample title' })
      ).toBeInTheDocument();
    });

    it('should render a dialog on click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Sample title' }));
      expect(
        screen.getByRole('dialog', { name: 'Sample title' })
      ).toBeInTheDocument();
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });
  });
});
