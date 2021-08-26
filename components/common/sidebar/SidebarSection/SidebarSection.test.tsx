import { renderBeforeEach, screen } from 'testing/util';

import { SidebarSection } from './SidebarSection';

describe('<SidebarSection />', () => {
  describe('default', () => {
    renderBeforeEach(
      <SidebarSection title="Sample title">Sample content</SidebarSection>
    );

    it('should render its title as heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Sample title' })
      ).toBeInTheDocument();
    });

    it('should render its content', () => {
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });
  });

  describe('with count', () => {
    renderBeforeEach(
      <SidebarSection title="Sample title" count={123}>
        Sample content
      </SidebarSection>
    );

    it('should render its count', () => {
      expect(screen.getByText('123')).toBeInTheDocument();
    });
  });
});
