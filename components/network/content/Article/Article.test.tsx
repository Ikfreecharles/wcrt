import dayjs from 'dayjs';

import { renderBeforeEach, screen, t } from 'testing/util';
import { article } from 'testing/data';

import { Article } from './Article';

describe('<Article />', () => {
  renderBeforeEach(<Article data={article as any} />);

  it('should render its content type', () => {
    expect(screen.getByText('Article')).toBeInTheDocument();
  });

  it('should render its created timestamp as relative date', () => {
    expect(
      screen.getByText(dayjs(article.createdAt).fromNow())
    ).toBeInTheDocument();
  });

  it('should render its title as heading', () => {
    expect(
      screen.getByRole('heading', { name: article.title })
    ).toBeInTheDocument();
  });

  it('should render its author information', () => {
    expect(screen.getByText(article.createdByGroup!.name)).toBeInTheDocument();
    expect(screen.getByText(article.createdByGroup!.info!)).toBeInTheDocument();
  });

  it('should render its intro text', () => {
    expect(screen.getByText(article.intro!)).toBeInTheDocument();
  });

  it('should render its images', () => {
    expect(screen.getAllByRole('img', { name: 'Article image' })).toHaveLength(
      article.imagedBy.edges.length
    );
  });

  it('should render its text as Markdown', () => {
    expect(screen.getByTestId('markdown')).toBeInTheDocument();
  });

  it('should render its translated categories', () => {
    article.categorizedBy.edges.forEach(({ node: category }) => {
      expect(
        screen.getByText(t(`content.category.${category.name}`))
      ).toBeInTheDocument();
    });
  });

  it('should render its location', () => {
    expect(
      screen.getByText(
        `${article.locatedByAddress!.addressLocality}, ${
          article.locatedByAddress!.addressCountry
        }`
      )
    ).toBeInTheDocument();
  });

  it('should render a share button', () => {
    expect(screen.getByRole('button', { name: 'Share' })).toBeInTheDocument();
  });
});
