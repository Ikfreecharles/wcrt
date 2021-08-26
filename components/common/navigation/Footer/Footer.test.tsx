import { renderBeforeEach, screen } from 'testing/util';

import { Footer } from './Footer';

describe('<Footer />', () => {
  renderBeforeEach(<Footer />);

  it('should render the logo', () => {
    expect(
      screen.getByRole('heading', { name: 'We Create' })
    ).toBeInTheDocument();
  });

  it('should render links to external documents', () => {
    expect(screen.getByRole('link', { name: 'Help' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Terms of Use' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About us' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Privacy' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Imprint' })).toBeInTheDocument();
  });
});
