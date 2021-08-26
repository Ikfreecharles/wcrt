import { renderBeforeEach, screen } from 'testing/util';
import { topics } from 'testing/data';
import { TopicTeaserFragment } from 'lib/graphql';

import { TopicCarousel } from './TopicCarousel';

describe('<TopicCarousel />', () => {
  renderBeforeEach(<TopicCarousel topics={topics as TopicTeaserFragment[]} />);

  it('should render its topics as links', () => {
    expect(screen.getAllByRole('link')).toHaveLength(topics.length);
  });

  it('should render the title as heading for each topic', () => {
    topics.forEach((topic) => {
      expect(
        screen.getByRole('heading', { name: topic.title })
      ).toBeInTheDocument();
    });
  });

  it('should render the author’s avatar for each topic', () => {
    topics.forEach((topic) => {
      expect(
        screen.getByRole('img', {
          name: `Group: ${topic.createdByGroup!.name}`,
        })
      ).toBeInTheDocument();
    });
  });
});
