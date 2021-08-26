import dayjs from 'dayjs';

import { renderBeforeEach, screen } from 'testing/util';
import { article } from 'testing/data';

import { ContentSummary } from './ContentSummary';

describe('<ContentSummary />', () => {
  describe('default', () => {
    renderBeforeEach(<ContentSummary data={article as any} />);

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

    it('should render its author name', () => {
      expect(
        screen.getByText(article.createdByGroup!.name)
      ).toBeInTheDocument();
    });

    it('should render a support button', () => {
      expect(
        screen.getByRole('button', { name: 'Support' })
      ).toBeInTheDocument();
    });

    it('should render a reply button', () => {
      expect(screen.getByRole('button', { name: 'Reply' })).toBeInTheDocument();
    });
  });

  describe('extended', () => {
    renderBeforeEach(<ContentSummary extended data={article as any} />);

    it('should render its image', () => {
      expect(
        screen.getByRole('img', { name: 'Article image' })
      ).toBeInTheDocument();
    });
  });
});
