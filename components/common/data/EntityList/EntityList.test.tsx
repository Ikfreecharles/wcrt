import {
  act,
  enqueueSnackbar,
  renderBeforeEach,
  screen,
  submit,
  userEvent,
} from 'testing/util';

import { EntityList } from './EntityList';

jest.mock('hooks/entity');

describe('<EntityList />', () => {
  const items = [
    {
      id: 'T:123:Article',
      leadingElement: <div data-testid="leading-element" />,
      title: 'Sample title',
      subtitle: 'Sample subtitle',
      url: '/article/123',
    },
    {
      id: 'T:456:Article',
      leadingElement: <div data-testid="leading-element" />,
      title: 'Some title',
      subtitle: 'Some subtitle',
      url: '/article/456',
    },
    {
      id: 'T:789:Article',
      leadingElement: <div data-testid="leading-element" />,
      title: 'Another title',
      subtitle: 'Another subtitle',
      url: '/article/789',
    },
  ];

  describe('default', () => {
    renderBeforeEach(<EntityList items={items} />);

    it('should render the list items', () => {
      expect(screen.getAllByRole('listitem')).toHaveLength(items.length);
    });

    it('should render a leading element for each item', () => {
      expect(screen.getAllByTestId('leading-element')).toHaveLength(
        items.length
      );
    });

    it('should render a title for each item', () => {
      items.forEach((item) => {
        expect(screen.getByText(item.title)).toBeInTheDocument();
      });
    });

    it('should render a subtitle for each item', () => {
      items.forEach((item) => {
        expect(screen.getByText(item.subtitle)).toBeInTheDocument();
      });
    });

    it('should render a link for each item', () => {
      items.forEach((item) => {
        expect(
          screen.getByRole('link', { name: `${item.title} ${item.subtitle}` })
        ).toHaveAttribute('href', item.url);
      });
    });
  });

  describe('editable', () => {
    renderBeforeEach(<EntityList editable items={items} />);

    it('should render edit buttons', () => {
      expect(screen.getAllByRole('button', { name: 'Edit' })).toHaveLength(
        items.length
      );
    });
  });

  describe('deleteable', () => {
    renderBeforeEach(<EntityList deletable items={items} />);

    it('should render delete buttons', () => {
      expect(screen.getAllByRole('button', { name: 'Delete' })).toHaveLength(
        items.length
      );
    });

    it('should render confirmation buttons on first click', () => {
      userEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
      expect(
        screen.getByRole('button', { name: 'Confirm' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Cancel' })
      ).toBeInTheDocument();
    });

    it('should trigger a delete on second click', async () => {
      userEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
      });
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith('delete', 'T:123:Article');
    });

    it('should trigger a notification on second click', async () => {
      userEvent.click(screen.getAllByRole('button', { name: 'Delete' })[0]);
      await act(async () => {
        userEvent.click(screen.getByRole('button', { name: 'Confirm' }));
      });
      expect(enqueueSnackbar).toHaveBeenCalledTimes(1);
      expect(enqueueSnackbar).toHaveBeenCalledWith('Content deleted.');
    });
  });

  describe('with custom actions', () => {
    renderBeforeEach(
      <EntityList
        items={items}
        createCustomAction={(id) => <>Sample action for {id}</>}
      />
    );

    it('should render a custom action for each item', () => {
      items.forEach((item) => {
        expect(
          screen.getByText(`Sample action for ${item.id}`)
        ).toBeInTheDocument();
      });
    });
  });

  describe('with pagination', () => {
    const pagination = {
      hasMore: true,
      fetchMore: jest.fn(),
    };

    renderBeforeEach(<EntityList items={items} pagination={pagination} />);

    it('should render a fetch more button', () => {
      expect(
        screen.getByRole('button', { name: 'Show more' })
      ).toBeInTheDocument();
    });

    it('should fetch more on button click', () => {
      userEvent.click(screen.getByRole('button', { name: 'Show more' }));
      expect(pagination.fetchMore).toHaveBeenCalledTimes(1);
    });
  });

  describe('with loading pagination', () => {
    const pagination = {
      hasMore: true,
      fetchMore: jest.fn(),
      loading: true,
    };

    renderBeforeEach(<EntityList items={items} pagination={pagination} />);

    it('should render a loading indicator', () => {
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
    });

    it('should not render a fetch more button', () => {
      expect(
        screen.queryByRole('button', { name: 'Show more' })
      ).not.toBeInTheDocument();
    });
  });

  describe('empty', () => {
    renderBeforeEach(<EntityList items={[]} />);

    it('should render an empty state', () => {
      expect(screen.getByText('No contents available yet')).toBeInTheDocument();
    });
  });
});
