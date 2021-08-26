import { BiGhost } from 'react-icons/bi';

import { renderBeforeEach, screen } from 'testing/util';

import { IconButton } from './IconButton';

describe('<IconButton />', () => {
  renderBeforeEach(<IconButton title="Sample title" icon={BiGhost} />);

  it('should render a button', () => {
    expect(
      screen.getByRole('button', { name: 'Sample title' })
    ).toBeInTheDocument();
  });
});
