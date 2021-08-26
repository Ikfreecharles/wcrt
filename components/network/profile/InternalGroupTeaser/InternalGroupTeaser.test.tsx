import { apollo, renderBeforeEach, screen } from 'testing/util';
import { group } from 'testing/data';

import { InternalGroupTeaser } from './InternalGroupTeaser';

describe('<InternalGroupTeaser />', () => {
  renderBeforeEach(<InternalGroupTeaser data={group as any} />);

  it('should render its avatar', () => {
    expect(
      screen.getByRole('img', { name: `Group: ${group.name}` })
    ).toBeInTheDocument();
  });

  it('should render its name', () => {
    expect(screen.getByText(group.name)).toBeInTheDocument();
  });

  it('should render the number of its members', () => {
    expect(
      screen.getByText(
        group.administeredBy.count > 1
          ? `${group.administeredBy.count} members`
          : `1 member`
      )
    ).toBeInTheDocument();
  });

  describe('with activity', () => {
    beforeAll(() => {
      apollo.response = {
        chatChannel: {
          unreadCount: 3,
        },
      };
    });

    it('should render an activity indicator', () => {
      expect(screen.getByTitle('New activity')).toHaveTextContent('3');
    });
  });
});
