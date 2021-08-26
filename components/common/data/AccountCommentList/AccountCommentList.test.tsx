import dayjs from 'dayjs';

import {
  renderBeforeEach,
  screen,
  apollo,
  getEntityConnection,
} from 'testing/util';
import { newComment } from 'testing/data';

import { AccountCommentList } from './AccountCommentList';

describe('<AccountCommentList />', () => {
  const commentConnection = getEntityConnection(newComment);

  beforeAll(() => {
    apollo.response = {
      me: {
        represents: {
          createsComment: { ...commentConnection },
        },
      },
    };
  });

  renderBeforeEach(<AccountCommentList />);

  it('should render a list item for each comment', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      commentConnection.edges.length
    );
  });

  it('should render a title for each comment', () => {
    commentConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByText(`Article: ${node.comments!.title}`)
      ).toBeInTheDocument();
    });
  });

  it('should render a formatted timestamp for each comment', () => {
    commentConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByText(
          dayjs(node.createdAt).format('MMMM D, YYYY [at] h:mm A')
        )
      ).toBeInTheDocument();
    });
  });
});
