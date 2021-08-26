import { renderBeforeEach, screen, setViewportWidth } from 'testing/util';

import { Layout } from './Layout';

describe('<Layout />', () => {
  describe('default', () => {
    renderBeforeEach(<Layout />);

    describe('on small screens', () => {
      it('should render mobile controls', () => {
        expect(screen.queryAllByTestId('mobile')).toHaveLength(2);
      });

      it('should not render desktop controls', () => {
        expect(screen.queryAllByTestId('desktop')).toHaveLength(0);
      });
    });

    describe('on large screens', () => {
      beforeAll(() => {
        setViewportWidth(1440);
      });

      it('should render desktop controls', () => {
        expect(screen.queryAllByTestId('desktop')).toHaveLength(2);
      });

      it('should not render mobile controls', () => {
        expect(screen.queryAllByTestId('mobile')).toHaveLength(0);
      });
    });
  });

  describe('embedded', () => {
    renderBeforeEach(<Layout embedded />);

    describe('on small screens', () => {
      it('should not render mobile controls', () => {
        expect(screen.queryAllByTestId('mobile')).toHaveLength(0);
      });
    });

    describe('on large screens', () => {
      beforeAll(() => {
        setViewportWidth(1440);
      });

      it('should not render desktop controls', () => {
        expect(screen.queryAllByTestId('desktop')).toHaveLength(0);
      });
    });
  });
});
