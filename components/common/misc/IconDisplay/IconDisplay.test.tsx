import { BiGhost } from 'react-icons/bi';

import { renderBeforeEach, screen } from 'testing/util';

import { IconDisplay } from './IconDisplay';

describe('<IconDisplay />', () => {
  renderBeforeEach(<IconDisplay icon={BiGhost} />);

  it('should render its icon as decorative SVG element', () => {
    expect(screen.getByTestId('svg')).toBeInTheDocument();
  });
});
