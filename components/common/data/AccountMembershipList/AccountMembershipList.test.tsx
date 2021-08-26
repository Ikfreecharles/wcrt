import dayjs from 'dayjs';

import {
  renderBeforeEach,
  screen,
  apollo,
  getEntityConnection,
} from 'testing/util';
import { newMembership } from 'testing/data';

import { AccountMembershipList } from './AccountMembershipList';

describe('<AccountMembershipList />', () => {
  const membershipConnection = getEntityConnection(newMembership);

  beforeAll(() => {
    apollo.response = {
      me: {
        ownsMembership: { ...membershipConnection },
      },
    };
  });

  renderBeforeEach(<AccountMembershipList />);

  it('should render a list item for each membership', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      membershipConnection.edges.length
    );
  });

  it('should render the title of each group', () => {
    membershipConnection.edges.forEach(({ node }) => {
      expect(screen.getByText(node.administers!.name)).toBeInTheDocument();
    });
  });

  it('should render the formatted timestamp of each membership', () => {
    membershipConnection.edges.forEach(({ node }) => {
      expect(
        screen.getByText(
          dayjs(node.createdAt).format('MMMM D, YYYY [at] h:mm A')
        )
      ).toBeInTheDocument();
    });
  });
});
