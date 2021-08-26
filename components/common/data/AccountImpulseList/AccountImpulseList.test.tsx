import dayjs from 'dayjs';

import {
  renderBeforeEach,
  screen,
  apollo,
  getEntityConnection,
} from 'testing/util';
import { newImpulse } from 'testing/data';

import { AccountImpulseList } from './AccountImpulseList';

describe('<AccountImpulseList />', () => {
  const impulseConnection = getEntityConnection(newImpulse);

  beforeAll(() => {
    apollo.response = {
      me: {
        represents: {
          createsContent: { ...impulseConnection },
        },
      },
    };
  });

  renderBeforeEach(<AccountImpulseList />);

  it('should render a list item for each impulse', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      impulseConnection.edges.length
    );
  });

  it('should render the title of each impulse', () => {
    impulseConnection.edges.forEach(({ node }) => {
      expect(screen.getByText(node.title)).toBeInTheDocument();
    });
  });

  it('should render the formatted timestamp of each impulse', () => {
    impulseConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByText(
          dayjs(node.createdAt).format('MMMM D, YYYY [at] h:mm A')
        )
      ).toBeInTheDocument();
    });
  });
});
