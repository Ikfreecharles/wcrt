import { renderBeforeEach, screen, t } from 'testing/util';
import { group } from 'testing/data';

import { GroupProfile } from './GroupProfile';

describe('<GroupProfile />', () => {
  renderBeforeEach(<GroupProfile data={group as any} />);

  it('should render the avatar', () => {
    expect(
      screen.getByRole('img', { name: `Group: ${group.name}` })
    ).toBeInTheDocument();
  });

  it('should render the name as heading', () => {
    expect(
      screen.getByRole('heading', { name: group.name })
    ).toBeInTheDocument();
  });

  it('should render the info text', () => {
    expect(screen.getByText(group.info!)).toBeInTheDocument();
  });

  it('should render the number of members', () => {
    expect(
      screen.getByText(`${group.administeredBy.count} members`)
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

  it('should render the intro text', () => {
    expect(screen.getByText(group.intro!)).toBeInTheDocument();
  });

  it('should render a reference to its origin impulse', () => {
    expect(
      screen.getByText('This group was formed out of an impulse.')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'View impulse' })
    ).toBeInTheDocument();
  });

  it('should render teasers of created articles', () => {
    expect(screen.getAllByRole('article')).toHaveLength(
      group.createsArticle.count
    );
  });
});
