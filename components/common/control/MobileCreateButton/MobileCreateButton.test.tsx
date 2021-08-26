import { renderBeforeEach, screen } from 'testing/util';

import { MobileCreateButton } from './MobileCreateButton';

describe('<MobileCreateButtton />', () => {
  renderBeforeEach(<MobileCreateButton />);

  it('should render a hidden button', () => {
    expect(screen.getByRole('button', { hidden: true })).toBeInTheDocument();
  });
});
