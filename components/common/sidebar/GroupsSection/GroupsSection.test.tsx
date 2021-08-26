import { renderBeforeEach, screen } from 'testing/util';
import { groups } from 'testing/data';
import { GroupTeaserFragment } from 'lib/graphql';

import { GroupsSection } from './GroupsSection';

describe('<GroupsSection />', () => {
  describe('default', () => {
    renderBeforeEach(<GroupsSection items={groups as GroupTeaserFragment[]} />);

    it('should render a heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Groups' })
      ).toBeInTheDocument();
    });

    it('should render the group teasers', () => {
      expect(screen.getAllByRole('article')).toHaveLength(groups.length);
    });
  });

  describe('empty', () => {
    renderBeforeEach(<GroupsSection items={[]} />);

    it('should render an empty state', () => {
      expect(screen.getByText('No groups available yet')).toBeInTheDocument();
    });
  });
});
