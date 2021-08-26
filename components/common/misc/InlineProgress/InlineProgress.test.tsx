import { renderBeforeEach, screen } from 'testing/util';

import { InlineProgress } from './InlineProgress';

describe('<InlineProgress />', () => {
  renderBeforeEach(<InlineProgress />);

  it('should render a loading indicator', () => {
    expect(
      screen.getByRole('progressbar', { name: 'Content is loading …' })
    ).toBeInTheDocument();
  });
});
