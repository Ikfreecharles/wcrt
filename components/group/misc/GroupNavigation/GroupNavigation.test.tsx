import { apollo, renderBeforeEach, screen } from 'testing/util';
import { group } from 'testing/data';

import { GroupNavigation } from './GroupNavigation';

describe('<GroupNavigation />', () => {
  beforeAll(() => {
    apollo.response = {
      group,
    };
  });

  renderBeforeEach(<GroupNavigation groupId="T:123:Group" />);

  it('should render the group image', () => {
    expect(
      screen.getByRole('img', { name: `Group: ${group.name}` })
    ).toBeInTheDocument();
  });

  it('should render the group name', () => {
    expect(screen.getByText(group.name)).toBeInTheDocument();
  });

  it('should render the group info', () => {
    expect(screen.getByText(group.info!)).toBeInTheDocument();
  });

  it('should render a link to the group profile', () => {
    expect(
      screen.getByRole('link', { name: 'Public group profile' })
    ).toBeInTheDocument();
  });

  it('should render the group navigation links', () => {
    expect(screen.getByRole('link', { name: 'Chat' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Members' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Network contents' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Calendar' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Tasks' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Shared documents' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'File storage' })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Polls' })).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Applications' })
    ).toBeInTheDocument();
  });

  describe('for admins', () => {
    beforeAll(() => {
      apollo.response = {
        group: {
          ...group,
          _viewer: {
            administeredBy: {
              edges: [{ node: { definedBy: { name: 'groupAdmin' } } }],
            },
          },
        },
      };
    });

    it('should render a link to the group settings', () => {
      expect(
        screen.getByRole('link', { name: 'Group settings' })
      ).toBeInTheDocument();
    });
  });
});
