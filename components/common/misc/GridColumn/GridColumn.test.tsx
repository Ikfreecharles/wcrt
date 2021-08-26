import { useContext } from 'react';

import { renderBeforeEach, screen, setViewportWidth } from 'testing/util';
import { ColumnContext } from 'context/column';

import { GridColumn } from './GridColumn';

const PrintColumnContext: React.FC = () => <>{useContext(ColumnContext)}</>;

describe('<GridColumn />', () => {
  renderBeforeEach(
    <GridColumn xs={12} sm={6} md={4} lg={3} xl={2}>
      <PrintColumnContext />
    </GridColumn>
  );

  describe('on extra small screens', () => {
    beforeAll(() => {
      setViewportWidth(320);
    });

    it('should provide XS column width as context', () => {
      expect(screen.getByText('12')).toBeInTheDocument();
    });
  });

  describe('on small screens', () => {
    beforeAll(() => {
      setViewportWidth(720);
    });

    it('should provide SM column width as context', () => {
      expect(screen.getByText('6')).toBeInTheDocument();
    });
  });

  describe('on medium screens', () => {
    beforeAll(() => {
      setViewportWidth(1024);
    });

    it('should provide MD column width as context', () => {
      expect(screen.getByText('4')).toBeInTheDocument();
    });
  });

  describe('on large screens', () => {
    beforeAll(() => {
      setViewportWidth(1440);
    });

    it('should provide LG column width as context', () => {
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('on extra large screens', () => {
    beforeAll(() => {
      setViewportWidth(2560);
    });

    it('should provide XL column width as context', () => {
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });
});
