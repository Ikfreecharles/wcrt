import { renderBeforeEach, screen } from 'testing/util';

import { Illustration } from './Illustration';

describe('<Illustration />', () => {
  renderBeforeEach(<Illustration name="wireframe" />);

  it('should render an image', () => {
    expect(screen.getByRole('img', { name: 'Wireframe' })).toBeInTheDocument();
  });
});
