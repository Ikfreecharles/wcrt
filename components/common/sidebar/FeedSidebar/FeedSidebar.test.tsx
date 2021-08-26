import {
  act,
  apollo,
  graphqlResponse,
  renderBeforeEach,
  screen,
  userEvent,
} from 'testing/util';

import { FeedSidebar } from './FeedSidebar';

describe('<FeedSidebar />', () => {
  const emptyFilters = { type: [], category: [], location: [] };
  const setFilters = jest.fn();

  beforeAll(() => {
    apollo.response = {
      ...graphqlResponse.categories,
      ...graphqlResponse.addresses,
    };
  });

  describe('default', () => {
    renderBeforeEach(
      <FeedSidebar
        filters={emptyFilters}
        setFilters={setFilters}
        loading={false}
      />
    );

    beforeEach(() => {
      userEvent.click(screen.getByRole('button', { name: 'Filters' }));
    });

    it('should render the content type filter section', () => {
      expect(
        screen.getByRole('heading', { name: 'Content types' })
      ).toBeInTheDocument();
    });

    it('should render a checkbox for each content type', () => {
      ['Impulse', 'Topic', 'Article'].forEach((type) => {
        expect(
          screen.getByRole('checkbox', { name: type })
        ).toBeInTheDocument();
      });
    });

    it('should update the content type filter on click', async () => {
      await act(async () => {
        userEvent.click(screen.getByRole('checkbox', { name: 'Impulse' }));
      });
      expect(setFilters).toHaveBeenCalledTimes(1);
      expect(setFilters).toHaveBeenCalledWith({
        type: ['impulse'],
        category: [],
        location: [],
      });
    });

    it('should render the category filter section', () => {
      expect(
        screen.getByRole('heading', { name: 'Categories' })
      ).toBeInTheDocument();
    });

    it('should render a checkbox for each category', () => {
      ['Culture', 'Administration', 'Environment'].forEach((category) => {
        expect(
          screen.getByRole('checkbox', { name: category })
        ).toBeInTheDocument();
      });
    });

    it('should update the category filter on click', async () => {
      await act(async () => {
        userEvent.click(screen.getByRole('checkbox', { name: 'Culture' }));
      });
      expect(setFilters).toHaveBeenCalledTimes(1);
      expect(setFilters).toHaveBeenCalledWith({
        type: [],
        category: ['T:123:Category'],
        location: [],
      });
    });

    it('should render the location filter section', () => {
      expect(
        screen.getByRole('heading', { name: 'Locations' })
      ).toBeInTheDocument();
    });

    it('should render a checkbox for each address', () => {
      ['Sample location', 'Some address', 'Random city'].forEach((address) => {
        expect(
          screen.getByRole('checkbox', { name: address })
        ).toBeInTheDocument();
      });
    });

    it('should update the location filter on click', async () => {
      await act(async () => {
        userEvent.click(
          screen.getByRole('checkbox', { name: 'Sample location' })
        );
      });
      expect(setFilters).toHaveBeenCalledTimes(1);
      expect(setFilters).toHaveBeenCalledWith({
        type: [],
        category: [],
        location: ['T:123:Address'],
      });
    });
  });

  describe('pending filters', () => {
    renderBeforeEach(
      <FeedSidebar
        filters={emptyFilters}
        setFilters={setFilters}
        loading={true}
      />
    );

    beforeEach(() => {
      userEvent.click(screen.getByRole('button', { name: 'Filters' }));
    });

    it('should disable all filters', () => {
      expect(
        screen
          .getAllByRole('checkbox')
          .filter((element) => element.getAttribute('aria-disabled'))
      ).toHaveLength(screen.getAllByRole('checkbox').length);
    });
  });

  describe('active filters', () => {
    renderBeforeEach(
      <FeedSidebar
        filters={{
          type: ['impulse'],
          category: ['T:123:Category'],
          location: ['T:123:Address'],
        }}
        setFilters={setFilters}
        loading={false}
      />
    );

    beforeEach(() => {
      userEvent.click(screen.getByRole('button', { name: 'Filters' }));
    });

    it('should render the active content type filter as checked', () => {
      expect(screen.getByRole('checkbox', { name: 'Impulse' })).toBeChecked();
    });

    it('should render the active category filter as checked', () => {
      expect(screen.getByRole('checkbox', { name: 'Culture' })).toBeChecked();
    });

    it('should render the active location filter as checked', () => {
      expect(
        screen.getByRole('checkbox', { name: 'Sample location' })
      ).toBeChecked();
    });
  });
});
