import dayjs from 'dayjs';

import {
  renderBeforeEach,
  screen,
  queryAllByRole,
  setViewportWidth,
  t,
} from 'testing/util';
import { topic } from 'testing/data';

import { Topic } from './Topic';

describe('<Topic />', () => {
  renderBeforeEach(<Topic data={topic as any} />);

  it('should render its images', () => {
    expect(screen.getAllByRole('img', { name: 'Topic image' })).toHaveLength(
      topic.imagedBy.edges.length
    );
  });

  it('should render its content type', () => {
    expect(screen.getByText('Topic')).toBeInTheDocument();
  });

  it('should render its updated timestamp as relative date', () => {
    expect(
      screen.getByText(`updated ${dayjs(topic.updatedAt).fromNow()}`)
    ).toBeInTheDocument();
  });

  it('should render its title as heading', () => {
    expect(
      screen.getByRole('heading', { name: topic.title })
    ).toBeInTheDocument();
  });

  it('should render its intro text', () => {
    expect(screen.getByText(topic.intro!)).toBeInTheDocument();
  });

  it('should render its curation contents as list items', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      topic.curates.edges.length
    );
  });

  it('should render its translated categories', () => {
    topic.categorizedBy.edges.forEach(({ node: category }) => {
      expect(
        screen.getByText(t(`content.category.${category.name}`))
      ).toBeInTheDocument();
    });
  });

  it('should render its location', () => {
    expect(
      screen.getByText(
        `${topic.locatedByAddress!.addressLocality}, ${
          topic.locatedByAddress!.addressCountry
        }`
      )
    ).toBeInTheDocument();
  });

  it('should render a share button', () => {
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });

  describe('on large screens', () => {
    beforeAll(() => {
      setViewportWidth(1440);
    });

    it('should render the images of its curation contents', () => {
      expect(
        queryAllByRole(screen.getByRole('list'), 'img', {
          name: 'Article image',
        })
      ).toHaveLength(topic.curates.edges.length);
    });
  });
});
