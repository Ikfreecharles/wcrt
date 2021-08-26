import { apollo, groupContext, renderBeforeEach, screen } from 'testing/util';
import { group } from 'testing/data';

import { GroupContents } from './GroupContents';

jest.mock('context/group');

describe('<GroupContents />', () => {
  beforeAll(() => {
    apollo.response = {
      group,
    };
  });

  renderBeforeEach(<GroupContents />);

  it('should render a heading', () => {
    expect(
      screen.getByRole('heading', { name: 'Network contents' })
    ).toBeInTheDocument();
  });

  it('should render the group contents as list items', () => {
    expect(screen.getAllByRole('listitem')).toHaveLength(
      group.managesContent.count
    );
  });

  describe('for admins', () => {
    beforeAll(() => {
      groupContext.viewerRole = 'admin';
    });

    it('should render a create button', () => {
      expect(
        screen.getByRole('button', { name: 'Create new article' })
      ).toBeInTheDocument();
    });
  });
});
