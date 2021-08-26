import { renderBeforeEach, screen } from 'testing/util';

import { WindowFooter } from './WindowFooter';

describe('<WindowFooter />', () => {
  renderBeforeEach(
    <WindowFooter leadingElement="Leading element">Sample content</WindowFooter>
  );

  it('should render its content', () => {
    expect(screen.getByText('Sample content')).toBeInTheDocument();
  });

  it('should render the leading element', () => {
    expect(screen.getByText('Leading element')).toBeInTheDocument();
  });
});
