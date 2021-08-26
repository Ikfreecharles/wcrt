import dayjs from 'dayjs';

import { renderBeforeEach, screen } from 'testing/util';
import { article } from 'testing/data';

import { ArticleTeaser } from './ArticleTeaser';

describe('<ArticleTeaser />', () => {
  renderBeforeEach(<ArticleTeaser data={article as any} />);

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

  it('should render its image', () => {
    expect(
      screen.getByRole('img', { name: 'Article image' })
    ).toBeInTheDocument();
  });

  it('should render its author information', () => {
    expect(screen.getByText(article.createdByGroup!.name)).toBeInTheDocument();
    expect(screen.getByText(article.createdByGroup!.info!)).toBeInTheDocument();
  });

  it('should render its intro text', () => {
    expect(screen.getByText(article.intro!)).toBeInTheDocument();
  });

  it('should render a link to the content page', () => {
    expect(screen.getByRole('link', { name: 'Read more' })).toHaveAttribute(
      'href',
      `/article/${article.id.split(':')[1]}`
    );
  });

  it('should render a support button', () => {
    expect(screen.getByRole('button', { name: 'Support' })).toBeInTheDocument();
  });

  it('should render a reply button', () => {
    expect(screen.getByRole('button', { name: 'Reply' })).toBeInTheDocument();
  });
});
