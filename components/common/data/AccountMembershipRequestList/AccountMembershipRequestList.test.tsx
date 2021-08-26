import dayjs from 'dayjs';

import {
  renderBeforeEach,
  screen,
  apollo,
  getEntityConnection,
} from 'testing/util';
import { newMembershipRequest } from 'testing/data';

import { AccountMembershipRequestList } from './AccountMembershipRequestList';

describe('<AccountMembershipRequestList />', () => {
  const requestConnection = getEntityConnection(newMembershipRequest);

  beforeAll(() => {
    apollo.response = {
      me: {
        ownsMembershipRequest: { ...requestConnection },
      },
    };
  });

  renderBeforeEach(<AccountMembershipRequestList />);

  it('should render a list item for each request', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      requestConnection.edges.length
    );
  });

  it('should render the title of each requested group', () => {
    requestConnection.edges.forEach(({ node }) => {
      expect(screen.getByText(node.receivedBy!.name)).toBeInTheDocument();
    });
  });

  it('should render the formatted timestamp of each request', () => {
    requestConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByText(
          dayjs(node.createdAt).format('MMMM D, YYYY [at] h:mm A')
        )
      ).toBeInTheDocument();
    });
  });
});
