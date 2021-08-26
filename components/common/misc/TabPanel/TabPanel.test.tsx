import { renderBeforeEach, screen } from 'testing/util';

import { TabPanel } from './TabPanel';

describe('<TabPanel />', () => {
  describe('initial tab', () => {
    renderBeforeEach(
      <TabPanel index={0} activeTab={0}>
        Sample content
      </TabPanel>
    );

    it('should render its content', () => {
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });
  });

  describe('invisible tab', () => {
    renderBeforeEach(
      <TabPanel index={1} activeTab={0}>
        Sample content
      </TabPanel>
    );

    it('should not render its content', () => {
      expect(screen.queryByText('Sample content')).not.toBeInTheDocument();
    });
  });

  describe('active tab', () => {
    renderBeforeEach(
      <TabPanel index={1} activeTab={1}>
        Sample content
      </TabPanel>
    );

    it('should render its content', () => {
      expect(screen.getByText('Sample content')).toBeInTheDocument();
    });
  });
});
