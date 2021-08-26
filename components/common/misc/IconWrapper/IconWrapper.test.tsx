import { BiGhost } from 'react-icons/bi';

import { renderBeforeEach, screen } from 'testing/util';

import { IconWrapper } from './IconWrapper';

describe('<IconWrapper />', () => {
  renderBeforeEach(
    <IconWrapper icon={BiGhost} title="Sample icon">
      Sample text
    </IconWrapper>
  );

  it('should render its icon as decorative SVG element', () => {
    expect(screen.getByTestId('svg')).toBeInTheDocument();
  });

  it('should render its title as icon label', () => {
    expect(
      screen.getByRole('img', { name: 'Sample icon' })
    ).toBeInTheDocument();
  });

  it('should render its text content', () => {
    expect(screen.getByText('Sample text')).toBeInTheDocument();
  });
});
