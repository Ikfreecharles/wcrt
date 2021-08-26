import { articles, impulses, topics } from 'testing/data';
import { renderBeforeEach, screen, userEvent } from 'testing/util';
import { ContentTeaserFragment } from 'lib/graphql';

import { Feed } from './Feed';

describe('<Feed />', () => {
  describe('default', () => {
    renderBeforeEach(
      <Feed
        items={[...articles, ...impulses, ...topics] as ContentTeaserFragment[]}
      />
    );

    it('should render a feed element', () => {
      expect(screen.getByRole('feed')).toBeInTheDocument();
    });

    it('should render its items as self-contained compositions', () => {
      expect(screen.getAllByRole('article')).toHaveLength(
        articles.length + impulses.length + topics.length
      );
    });

    it('should render its the correct teaser components', () => {
      expect(screen.getAllByText('Article')).toHaveLength(articles.length);
      expect(screen.getAllByText('Topic')).toHaveLength(topics.length);
    });
  });

  describe('with pagination', () => {
    const pagination = {
      hasMore: true,
      fetchMore: jest.fn(),
    };

    renderBeforeEach(
      <Feed
        items={articles as ContentTeaserFragment[]}
        pagination={pagination}
      />
    );

    it('should render a fetch more button', () => {
      expect(
        screen.getByRole('button', { name: 'Show more' })
      ).toBeInTheDocument();
    });

    it('should fetch more on button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Show more' }));
      expect(pagination.fetchMore).toHaveBeenCalledTimes(1);
    });
  });

  describe('with loading pagination', () => {
    const pagination = {
      hasMore: true,
      fetchMore: jest.fn(),
      loading: true,
    };

    renderBeforeEach(
      <Feed
        items={articles as ContentTeaserFragment[]}
        pagination={pagination}
      />
    );

    it('should render a loading indicator', () => {
      expect(
        screen.getByRole('progressbar', { name: 'Content is loading …' })
      ).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    const reset = jest.fn();

    renderBeforeEach(<Feed items={[]} reset={reset} />);

    it('should render a fallback text', () => {
      expect(screen.getByText(/Nothing found/)).toBeInTheDocument();
      expect(screen.getByText(/The filter criteria/)).toBeInTheDocument();
    });

    it('should render a reset button', () => {
      expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
    });

    it('should call the reset handler on click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Reset' }));
      expect(reset).toHaveBeenCalledTimes(1);
    });
  });

  describe('custom empty state', () => {
    renderBeforeEach(<Feed items={[]} emptyState={<>Sample text</>} />);

    it('should render a custom text', () => {
      expect(screen.getByText('Sample text')).toBeInTheDocument();
    });
  });
});
