import { renderBeforeEach, screen } from 'testing/util';

import { TeaserActions } from './TeaserActions';

describe('<TeaserActions />', () => {
  renderBeforeEach(
    <TeaserActions
      id="T:123:Article"
      supportCount={16}
      commentCount={4}
      buttonText="Sample link"
    />
  );

  it('should render a link to the content', () => {
    expect(screen.getByRole('link', { name: 'Sample link' })).toHaveAttribute(
      'href',
      '/article/123'
    );
  });

  it('should render a support button', () => {
    expect(screen.getByRole('button', { name: 'Support' })).toBeInTheDocument();
  });

  it('should render a reply button', () => {
    expect(screen.getByRole('button', { name: 'Reply' })).toBeInTheDocument();
  });
});
