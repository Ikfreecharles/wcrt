import { renderBeforeEach, screen } from 'testing/util';

import { MobileLayout } from './MobileLayout';

describe('<MobileLayout />', () => {
  describe('default', () => {
    renderBeforeEach(<MobileLayout />);

    it('should render the mobile controls', () => {
      expect(screen.queryAllByTestId('mobile')).toHaveLength(2);
    });
  });

  describe('embedded', () => {
    renderBeforeEach(<MobileLayout embedded />);

    it('should not render the mobile controls', () => {
      expect(screen.queryAllByTestId('mobile')).toHaveLength(0);
    });
  });
});
