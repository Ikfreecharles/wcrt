import {
  renderBeforeEach,
  screen,
  auth,
  formStatus,
  enqueueSnackbar,
} from 'testing/util';
import { comments } from 'testing/data';
import { CommentFragment } from 'lib/graphql';

import { CommentSection } from './CommentSection';

jest.mock('hooks/profile');
jest.mock('hooks/form');

describe('<CommentSection />', () => {
  describe('default', () => {
    renderBeforeEach(
      <CommentSection
        contentId="T:123:Article"
        comments={comments as CommentFragment[]}
        count={123}
      />
    );

    it('should render a heading', () => {
      expect(
        screen.getByRole('heading', { name: 'Replies' })
      ).toBeInTheDocument();
    });

    it('should render the number of comments', () => {
      expect(screen.getByText('123')).toBeInTheDocument();
    });

    it('should render a comment list', () => {
      expect(screen.getAllByRole('listitem')).toHaveLength(comments.length);
    });

    describe('authenticated', () => {
      beforeAll(() => {
        auth.session = auth.getActiveSession();
      });

      it('should render the comment form', () => {
        expect(screen.getByRole('form', { name: 'Reply' })).toBeInTheDocument();
      });

      it('should render the user signature', () => {
        expect(
          screen.getByRole('img', { name: 'Sample user' })
        ).toBeInTheDocument();
        expect(screen.getByText('Sample user')).toBeInTheDocument();
        expect(screen.getByText('Lorem ipsum')).toBeInTheDocument();
      });

      it('should render a submit button', () => {
        expect(
          screen.getByRole('button', { name: 'Reply' })
        ).toBeInTheDocument();
      });

      it('should disable the submit button initially', () => {
        expect(screen.getByRole('button', { name: 'Reply' })).toBeDisabled();
      });

      describe('valid form', () => {
        beforeAll(() => {
          formStatus.formStatus = 'valid';
        });

        it('should enable the submit button', () => {
          expect(
            screen.getByRole('button', { name: 'Reply' })
          ).not.toBeDisabled();
        });
      });

      describe('completed form', () => {
        beforeAll(() => {
          formStatus.formStatus = 'completed';
        });

        it('should trigger a notification', () => {
          expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
          expect(enqueueSnackbar).toHaveBeenCalledWith('Reply published.');
        });
      });
    });
  });

  describe('empty', () => {
    renderBeforeEach(
      <CommentSection contentId="T:123:Article" comments={[]} count={0} />
    );

    it('should render an empty state', () => {
      expect(screen.getByText('No replies yet')).toBeInTheDocument();
    });
  });
});
