import { renderBeforeEach, screen, userEvent } from 'testing/util';
import { groups } from 'testing/data';
import { GroupPreviewFragment } from 'lib/graphql';

import { GroupPreviewList } from './GroupPreviewList';

describe('<GroupPreviewList />', () => {
  describe('default', () => {
    renderBeforeEach(
      <GroupPreviewList groups={groups as GroupPreviewFragment[]} />
    );

    it('should render its groups as list items', () => {
      expect(screen.getAllByRole('listitem')).toHaveLength(groups.length);
    });
  });

  describe('with pagination', () => {
    const pagination = {
      hasMore: true,
      fetchMore: jest.fn(),
    };

    renderBeforeEach(
      <GroupPreviewList
        groups={groups as GroupPreviewFragment[]}
        pagination={pagination}
      />
    );

    it('should render a button', () => {
      expect(
        screen.getByRole('button', { name: 'Show previous groups' })
      ).toBeInTheDocument();
    });

    it('should fetch more on button click', () => {
      userEvent.click(
        screen.getByRole('button', { name: 'Show previous groups' })
      );
      expect(pagination.fetchMore).toHaveBeenCalledTimes(1);
    });
  });

  describe('with loading pagination', () => {
    const pagination = {
      hasMore: true,
      fetchMore: jest.fn(),
      loading: true,
    };

    renderBeforeEach(
      <GroupPreviewList
        groups={groups as GroupPreviewFragment[]}
        pagination={pagination}
      />
    );

    it('should disable the button while loading', () => {
      expect(
        screen.getByRole('button', { name: 'Show previous groups' })
      ).toBeDisabled();
    });
  });
});
