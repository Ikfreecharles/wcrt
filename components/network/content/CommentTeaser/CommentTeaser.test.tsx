import { renderBeforeEach, screen } from 'testing/util';
import { comment } from 'testing/data';

import { CommentTeaser } from './CommentTeaser';

describe('<CommentTeaser />', () => {
  renderBeforeEach(<CommentTeaser data={comment as any} />);

  it('should render the comment', () => {
    expect(screen.getByRole('comment')).toBeInTheDocument();
  });

  it('should render a link to the comment target', () => {
    expect(
      screen.getByRole('link', { name: `Article: ${comment.comments!.title}` })
    ).toBeInTheDocument();
  });
});
