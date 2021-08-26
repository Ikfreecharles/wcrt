import dayjs from 'dayjs';

import {
  renderBeforeEach,
  screen,
  apollo,
  getEntityConnection,
} from 'testing/util';
import { newContentRating, newCommentRating } from 'testing/data';

import { AccountRatingList } from './AccountRatingList';

describe('<AccountRatingList />', () => {
  const contentRatingConnection = getEntityConnection(newContentRating, 3);
  const commentRatingConnection = getEntityConnection(newCommentRating, 3);

  describe('content ratings', () => {
    beforeAll(() => {
      apollo.response = {
        me: {
          represents: {
            createsRating: { ...contentRatingConnection },
          },
        },
      };
    });

    renderBeforeEach(<AccountRatingList />);

    it('should render a list item for each rating', () => {
      expect(screen.getAllByRole('listitem')).toHaveLength(
        contentRatingConnection.edges.length
      );
    });

    it('should render a title for each rating', () => {
      contentRatingConnection.edges.forEach(({ node }) => {
        expect(
          screen.getByText(`Article: ${node.rates!.title}`)
        ).toBeInTheDocument();
      });
    });

    it('should render a formatted timestamp for each rating', () => {
      contentRatingConnection.edges.forEach(({ node }) => {
        expect(
          screen.getByText(
            dayjs(node.createdAt).format('MMMM D, YYYY [at] h:mm A')
          )
        ).toBeInTheDocument();
      });
    });
  });

  describe('comment ratings', () => {
    beforeAll(() => {
      apollo.response = {
        me: {
          represents: {
            createsRating: { ...commentRatingConnection },
          },
        },
      };
    });

    renderBeforeEach(<AccountRatingList />);

    it('should render a list item for each rating', () => {
      expect(screen.getAllByRole('listitem')).toHaveLength(
        commentRatingConnection.edges.length
      );
    });

    it('should render a title for each rating', () => {
      commentRatingConnection.edges.forEach(({ node }) => {
        expect(
          screen.getByText(`Reply: ${node.rates!.comments?.title}`)
        ).toBeInTheDocument();
      });
    });

    it('should render a formatted timestamp for each rating', () => {
      commentRatingConnection.edges.forEach(({ node }) => {
        expect(
          screen.getByText(
            dayjs(node.createdAt).format('MMMM D, YYYY [at] h:mm A')
          )
        ).toBeInTheDocument();
      });
    });
  });
});
