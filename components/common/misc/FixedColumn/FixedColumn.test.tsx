import { renderBeforeEach, screen } from 'testing/util';

import { FixedColumn } from './FixedColumn';

describe('<FixedColumn />', () => {
  renderBeforeEach(
    <FixedColumn
      containerWidth="lg"
      spacing={4}
      xs={12}
      sm={6}
      md={4}
      lg={3}
      xl={2}
    >
      Sample content
    </FixedColumn>
  );

  it('should assign its container width to a container element', () => {
    expect(screen.getByTestId('container')).toHaveClass(
      'MuiContainer-maxWidthLg'
    );
  });

  it('should assign its spacing to a grid container element', () => {
    expect(screen.getByTestId('grid-container')).toHaveClass(
      'MuiGrid-spacing-xs-4'
    );
  });

  it('should assign its widths to a grid item element', () => {
    expect(screen.getByTestId('grid-item')).toHaveClass('MuiGrid-grid-xs-12');
    expect(screen.getByTestId('grid-item')).toHaveClass('MuiGrid-grid-sm-6');
    expect(screen.getByTestId('grid-item')).toHaveClass('MuiGrid-grid-md-4');
    expect(screen.getByTestId('grid-item')).toHaveClass('MuiGrid-grid-lg-3');
    expect(screen.getByTestId('grid-item')).toHaveClass('MuiGrid-grid-xl-2');
  });

  it('should render its content', () => {
    expect(screen.getByText('Sample content')).toBeInTheDocument();
  });
});
