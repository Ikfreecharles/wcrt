import { useContext } from 'react';
import { apollo, renderBeforeEach, screen } from 'testing/util';
import { group } from 'testing/data';
import { GroupContext } from 'context/group';

import { GroupPageWrapper } from './GroupPageWrapper';

jest.mock('hooks/init');

const PrintGroupContext: React.FC = () => {
  const { groupId, groupName, viewerRole } = useContext(GroupContext);

  return (
    <div>
      <p>ID: {groupId}</p>
      <p>Name: {groupName}</p>
      <p>Viewer role: {viewerRole}</p>
    </div>
  );
};

describe('<GroupPageWrapper />', () => {
  beforeAll(() => {
    apollo.response = {
      group,
    };
  });

  renderBeforeEach(
    <GroupPageWrapper>
      <PrintGroupContext />
    </GroupPageWrapper>
  );

  it('should supply the group ID as context', () => {
    expect(screen.getByText(`ID: ${group.id}`)).toBeInTheDocument();
  });

  it('should supply the group name as context', () => {
    expect(screen.getByText(`Name: ${group.name}`)).toBeInTheDocument();
  });

  it('should supply the viewer role as context', () => {
    expect(screen.getByText(`Viewer role: member`)).toBeInTheDocument();
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

    it('should supply the viewer role as context', () => {
      expect(screen.getByText(`Viewer role: admin`)).toBeInTheDocument();
    });
  });
});
