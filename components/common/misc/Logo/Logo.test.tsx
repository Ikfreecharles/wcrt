import { renderBeforeEach, screen } from 'testing/util';

import { Logo } from './Logo';

describe('<Logo />', () => {
  describe('default', () => {
    renderBeforeEach(<Logo />);

    it('should render the site name as heading', () => {
      expect(
        screen.getByRole('heading', { name: 'We Create' })
      ).toBeInTheDocument();
    });

    it('should render a decorative SVG element', () => {
      expect(screen.getByTestId('svg')).toBeInTheDocument();
    });
  });

  describe('plain', () => {
    renderBeforeEach(<Logo plain />);

    it('should not render the site name', () => {
      expect(
        screen.queryByRole('heading', { name: 'We Create' })
      ).not.toBeInTheDocument();
    });
  });
});
