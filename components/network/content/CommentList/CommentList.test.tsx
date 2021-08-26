import { renderBeforeEach, screen, userEvent } from 'testing/util';
import { comments } from 'testing/data';
import { CommentFragment } from 'lib/graphql';

import { CommentList } from './CommentList';

describe('<CommentList />', () => {
  describe('default', () => {
    renderBeforeEach(<CommentList comments={comments as CommentFragment[]} />);

    it('should render its comments as list items', () => {
      expect(screen.getAllByRole('listitem')).toHaveLength(comments.length);
    });
  });

  describe('with pagination', () => {
    const pagination = {
      hasMore: true,
      fetchMore: jest.fn(),
    };

    renderBeforeEach(
      <CommentList
        comments={comments as CommentFragment[]}
        pagination={pagination}
      />
    );

    it('should render a button', () => {
      expect(
        screen.getByRole('button', { name: 'Show previous replies' })
      ).toBeInTheDocument();
    });

    it('should fetch more on button click', () => {
      userEvent.click(
        screen.getByRole('button', { name: 'Show previous replies' })
      );
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
      <CommentList
        comments={comments as CommentFragment[]}
        pagination={pagination}
      />
    );

    it('should disable the button while loading', () => {
      expect(
        screen.getByRole('button', { name: 'Show previous replies' })
      ).toBeDisabled();
    });
  });
});
