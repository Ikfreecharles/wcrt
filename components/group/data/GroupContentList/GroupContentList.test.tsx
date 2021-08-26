import dayjs from 'dayjs';

import {
  renderBeforeEach,
  screen,
  apollo,
  getEntityConnection,
} from 'testing/util';
import { newArticle } from 'testing/data';

import { GroupContentList } from './GroupContentList';

jest.mock('context/group');

describe('<GroupContentList />', () => {
  const articleConnection = getEntityConnection(newArticle);

  beforeAll(() => {
    apollo.response = {
      group: {
        managesContent: { ...articleConnection },
      },
    };
  });

  renderBeforeEach(<GroupContentList />);

  it('should render a list item for each article', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      articleConnection.edges.length
    );
  });

  it('should render the title of each article', () => {
    articleConnection.edges.forEach(({ node }) => {
      expect(screen.getByText(node.title)).toBeInTheDocument();
    });
  });

  it('should render the formatted timestamp of each article', () => {
    articleConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByText(
          dayjs(node.createdAt).format('MMMM D, YYYY [at] h:mm A')
        )
      ).toBeInTheDocument();
    });
  });

  it('should render an edit button for each article', () => {
    expect(screen.getAllByRole('button', { name: 'Edit' })).toHaveLength(
      articleConnection.edges.length
    );
  });

  it('should render an delete button for each article', () => {
    expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(
      articleConnection.edges.length
    );
  });
});
