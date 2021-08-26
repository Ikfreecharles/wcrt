import { renderBeforeEach, screen } from 'testing/util';

import { ContentFooter } from './ContentFooter';

describe('<ContentFooter />', () => {
  renderBeforeEach(
    <ContentFooter
      id="T:123:Article"
      categories={['culture', 'administration', 'environment']}
      location={{
        addressCountry: 'Deutschland',
        addressLocality: 'Leipzig',
      }}
    />
  );

  it('should render its categories', () => {
    expect(screen.getByText('Culture')).toBeInTheDocument();
    expect(screen.getByText('Administration')).toBeInTheDocument();
    expect(screen.getByText('Environment')).toBeInTheDocument();
  });

  it('should render its location', () => {
    expect(screen.getByRole('img', { name: 'Location' })).toBeInTheDocument();
    expect(screen.getByText('Leipzig, Deutschland')).toBeInTheDocument();
  });

  it('should render a share button', () => {
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });
});
