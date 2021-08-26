import { BiGhost } from 'react-icons/bi';

import { renderBeforeEach, screen } from 'testing/util';

import { IconBadge } from './IconBadge';

describe('<IconBadge />', () => {
  renderBeforeEach(<IconBadge icon={BiGhost} hasActivity={false} />);

  it('should render its icon as decorative SVG element', () => {
    expect(screen.getByTestId('svg')).toBeInTheDocument();
  });

  it('should render a badge as decorative element', () => {
    expect(screen.getByTestId('badge')).toBeInTheDocument();
  });
});
