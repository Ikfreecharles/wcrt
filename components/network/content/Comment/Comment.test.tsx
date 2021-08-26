import dayjs from 'dayjs';

import { renderBeforeEach, screen } from 'testing/util';
import { comment } from 'testing/data';

import { Comment } from './Comment';

describe('<Comment />', () => {
  renderBeforeEach(<Comment data={comment as any} />);

  it('should render as comment', () => {
    expect(screen.getByRole('comment')).toBeInTheDocument();
  });

  it('should render the author’s image', () => {
    expect(
      screen.getByRole('img', { name: comment.createdBy!.name })
    ).toBeInTheDocument();
  });

  it('should render the author’s name', () => {
    expect(screen.getByText(comment.createdBy!.name)).toBeInTheDocument();
  });

  it('should render its created timestamp as relative date', () => {
    expect(
      screen.getByText(dayjs(comment.createdAt).fromNow())
    ).toBeInTheDocument();
  });
});
