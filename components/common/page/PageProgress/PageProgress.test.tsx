import { renderBeforeEach, screen } from 'testing/util';

import { PageProgress } from './PageProgress';

describe('<PageProgress />', () => {
  renderBeforeEach(<PageProgress />);

  it('should render a loading indicator', () => {
    expect(
      screen.getByRole('progressbar', { name: 'Page is loading …' })
    ).toBeInTheDocument();
  });
});
