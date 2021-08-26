import { renderBeforeEach, screen } from 'testing/util';
import { person } from 'testing/data';

import { PersonProfile } from './PersonProfile';

describe('<PersonProfile />', () => {
  renderBeforeEach(<PersonProfile data={person as any} />);

  it('should render the avatar', () => {
    expect(screen.getByRole('img', { name: person.name })).toBeInTheDocument();
  });

  it('should render the name as heading', () => {
    expect(
      screen.getByRole('heading', { name: person.name })
    ).toBeInTheDocument();
  });

  it('should render the info text', () => {
    expect(screen.getByText(person.info!)).toBeInTheDocument();
  });

  it('should render the number of contributions', () => {
    expect(
      screen.getByText(
        `${
          person.createsContent.count +
          person.createsComment.count +
          person.createsRating.count
        } contributions`
      )
    ).toBeInTheDocument();
  });

  it('should render the number of groups', () => {
    expect(screen.getByText('0 groups')).toBeInTheDocument();
  });

  it('should render the location', () => {
    expect(
      screen.getByText(person.locatedByAddress!.addressLocality)
    ).toBeInTheDocument();
  });

  it('should render the intro text', () => {
    expect(screen.getByText(person.intro!)).toBeInTheDocument();
  });

  it('should render teasers of created content', () => {
    expect(screen.getAllByRole('article')).toHaveLength(
      person.createsContent.count
    );
  });
});
