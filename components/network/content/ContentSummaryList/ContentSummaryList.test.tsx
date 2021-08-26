import { renderBeforeEach, screen, getByRole, userEvent } from 'testing/util';
import { articles } from 'testing/data';
import { ContentSummaryFragment } from 'lib/graphql';

import { ContentSummaryList } from './ContentSummaryList';

describe('<ContentSummaryList />', () => {
  describe('default', () => {
    renderBeforeEach(
      <ContentSummaryList contents={articles as ContentSummaryFragment[]} />
    );

    it('should render the number of its contents as heading', () => {
      expect(
        screen.getAllByRole('heading', {
          name: `${articles.length} contents`,
        })
      ).toBeInTheDocument;
    });

    it('should render its contents as list items', () => {
      expect(screen.getAllByRole('listitem')).toHaveLength(articles.length);
    });

    it('should render links to its contents', () => {
      expect(screen.getAllByRole('link')).toHaveLength(articles.length);
    });

    it('should render its contents in descending order', () => {
      const descSortedArticles = [...articles].sort(
        (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
      );
      expect(
        getByRole(screen.getAllByRole('article')[0], 'heading')
      ).toHaveTextContent(descSortedArticles[0].title);
    });

    it('should render a sort button', () => {
      expect(
        screen.getByRole('button', { name: 'Sort by date Descending' })
      ).toBeInTheDocument();
    });

    it('should update its sort order on click', () => {
      const ascSortedArticles = [...articles].sort(
        (a, b) => a.createdAt.getTime() - b.createdAt.getTime()
      );
      userEvent.click(
        screen.getByRole('button', { name: 'Sort by date Descending' })
      );
      expect(
        screen.getByRole('button', { name: 'Sort by date Ascending' })
      ).toBeInTheDocument();
      expect(
        getByRole(screen.getAllByRole('article')[0], 'heading')
      ).toHaveTextContent(ascSortedArticles[0].title);
    });
  });

  describe('extended', () => {
    renderBeforeEach(
      <ContentSummaryList
        extended
        contents={articles as ContentSummaryFragment[]}
      />
    );

    it('should render the images of its contents', () => {
      expect(
        screen.getAllByRole('img', { name: 'Article image' })
      ).toHaveLength(articles.length);
    });
  });
});
