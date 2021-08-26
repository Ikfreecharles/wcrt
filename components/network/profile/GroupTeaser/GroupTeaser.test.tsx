import { renderBeforeEach, screen, setViewportWidth, t } from 'testing/util';
import { group } from 'testing/data';

import { GroupTeaser } from './GroupTeaser';

describe('<GroupTeaser />', () => {
  renderBeforeEach(<GroupTeaser data={group as any} />);

  it('should render the name as heading', () => {
    expect(
      screen.getByRole('heading', { name: group.name })
    ).toBeInTheDocument();
  });

  it('should render the category', () => {
    expect(
      screen.getByText(t(`content.category.${group.categorizedBy!.name}`))
    ).toBeInTheDocument();
  });

  it('should render the location', () => {
    expect(
      screen.getByText(group.locatedByAddress!.addressLocality)
    ).toBeInTheDocument();
  });

  describe('on large screens', () => {
    beforeAll(() => {
      setViewportWidth(1440);
    });

    it('should render the avatar', () => {
      expect(
        screen.getByRole('img', { name: `Group: ${group.name}` })
      ).toBeInTheDocument();
    });

    it('should render the intro text', () => {
      expect(screen.getByText(group.intro!)).toBeInTheDocument();
    });
  });
});
