import { renderBeforeEach, screen } from 'testing/util';
import { group } from 'testing/data';

import { GroupPreview } from './GroupPreview';

describe('<GroupPreview />', () => {
  renderBeforeEach(<GroupPreview data={group as any} />);

  it('should render the group name as heading', () => {
    expect(
      screen.getByRole('heading', { name: group.name })
    ).toBeInTheDocument();
  });

  it('should render the group intro text', () => {
    expect(screen.getByText(group.intro!)).toBeInTheDocument();
  });
});
