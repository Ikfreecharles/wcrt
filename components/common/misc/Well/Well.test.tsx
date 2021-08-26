import { renderBeforeEach, screen } from 'testing/util';

import { Well } from './Well';

describe('<Well />', () => {
  describe('single child', () => {
    renderBeforeEach(<Well>Sample text</Well>);

    it('should render a container element', () => {
      expect(screen.getByTestId('well-container')).toBeInTheDocument();
    });

    it('should render an item element', () => {
      expect(screen.getByTestId('well-item')).toBeInTheDocument();
    });
  });

  describe('multiple children', () => {
    renderBeforeEach(
      <Well>
        <>Sample text</>
        <>Sample text</>
        <>Sample text</>
      </Well>
    );

    it('should render a container element', () => {
      expect(screen.getByTestId('well-container')).toBeInTheDocument();
    });

    it('should render an item element for each child', () => {
      expect(screen.getAllByTestId('well-item')).toHaveLength(3);
    });
  });
});
