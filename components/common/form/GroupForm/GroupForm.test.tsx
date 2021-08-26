import {
  renderBeforeEach,
  screen,
  userEvent,
  fireEvent,
  act,
  submit,
  apollo,
  graphqlResponse,
} from 'testing/util';

import { GroupForm } from './GroupForm';

jest.mock('hooks/group');

describe('<GroupForm />', () => {
  const setStatus = jest.fn();
  const setResult = jest.fn();

  beforeAll(() => {
    apollo.response = {
      ...graphqlResponse.categories,
      ...graphqlResponse.addresses,
    };
  });

  describe('new group', () => {
    renderBeforeEach(
      <GroupForm
        mode="onChange"
        setStatus={setStatus}
        setResult={setResult}
        id="form-123"
      />
    );

    it('should render a form', () => {
      expect(
        screen.getByRole('form', { name: 'Create new group' })
      ).toBeInTheDocument();
    });

    it('should render its form elements', () => {
      expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Caption' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Avatar' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Description' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Contact information' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('group', { name: 'Category' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('group', { name: 'Location' })
      ).toBeInTheDocument();
    });

    it('should create a new group on submit', async () => {
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Name' }),
        'Sample name',
        { delay: 1 }
      );
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Caption' }),
        'Sample info',
        { delay: 1 }
      );
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Description' }),
        'Sample description',
        { delay: 1 }
      );
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Contact information' }),
        'Sample contact info',
        { delay: 1 }
      );
      await act(async () => {
        userEvent.click(screen.getByRole('checkbox', { name: 'Culture' }));
      });
      await act(async () => {
        userEvent.click(
          screen.getByRole('checkbox', { name: 'Sample location' })
        );
      });
      await act(async () => {
        fireEvent.submit(
          screen.getByRole('form', { name: 'Create new group' })
        );
      });
      expect(setStatus).toHaveBeenCalledWith('submitting');
      expect(setStatus).toHaveBeenCalledWith('completed');
      expect(setResult).toHaveBeenCalledTimes(1);
      expect(setResult).toHaveBeenCalledWith({
        data: { groupId: 'T:123:Group' },
      });
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith('group', {
        name: 'Sample name',
        info: 'Sample info',
        image: null,
        intro: 'Sample description',
        contactInfo: 'Sample contact info',
        categories: ['T:123:Category'],
        locations: ['T:123:Address'],
      });
    });
  });

  describe('new group with impulse', () => {
    renderBeforeEach(
      <GroupForm
        mode="onChange"
        setStatus={setStatus}
        setResult={setResult}
        relatedImpulse={{
          id: 'T:123:Impulse',
          categorizedBy: {
            edges: [
              {
                node: { id: 'T:123:Category' } as any,
              },
            ],
          },
          locatedByAddress: {
            id: 'T:123:Address',
          } as any,
        }}
        id="form-123"
      />
    );

    it('should render the impulse meta data as default values', () => {
      expect(screen.getByRole('checkbox', { name: 'Culture' })).toBeChecked();
      expect(
        screen.getByRole('checkbox', { name: 'Sample location' })
      ).toBeChecked();
    });

    it('should create a new impulse-related group on submit', async () => {
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Name' }),
        'Sample name',
        { delay: 1 }
      );
      await act(async () => {
        fireEvent.submit(
          screen.getByRole('form', { name: 'Create new group' })
        );
      });
      expect(setStatus).toHaveBeenCalledWith('submitting');
      expect(setStatus).toHaveBeenCalledWith('completed');
      expect(setResult).toHaveBeenCalledTimes(1);
      expect(setResult).toHaveBeenCalledWith({
        data: { groupId: 'T:123:Group' },
      });
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith('groupWithImpulse', 'T:123:Impulse', {
        name: 'Sample name',
        info: '',
        image: null,
        intro: '',
        contactInfo: '',
        categories: ['T:123:Category'],
        locations: ['T:123:Address'],
      });
    });
  });

  describe('existing group', () => {
    beforeAll(() => {
      apollo.response = {
        ...graphqlResponse.categories,
        ...graphqlResponse.addresses,
        group: {
          name: 'Sample name',
          info: 'Sample info',
          imagedBy: { id: 'T:123:Image', resourceLocation: '' },
          intro: 'Sample description',
          contactInfo: 'Sample contact info',
          categorizedBy: { id: 'T:123:Category' },
          locatedByAddress: { id: 'T:123:Address' },
        },
      };
    });

    renderBeforeEach(
      <GroupForm
        editId="T:123:Group"
        mode="onChange"
        setStatus={setStatus}
        setResult={setResult}
        id="form-123"
      />
    );

    it('should render a form', () => {
      expect(
        screen.getByRole('form', { name: 'Edit group' })
      ).toBeInTheDocument();
    });

    it('should render its form elements', () => {
      expect(screen.getByRole('textbox', { name: 'Name' })).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Caption' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Avatar' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Description' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Contact information' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('group', { name: 'Category' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('group', { name: 'Location' })
      ).toBeInTheDocument();
    });

    it('should render its default values', () => {
      expect(screen.getByRole('textbox', { name: 'Name' })).toHaveValue(
        'Sample name'
      );
      expect(screen.getByRole('textbox', { name: 'Caption' })).toHaveValue(
        'Sample info'
      );
      expect(
        screen.getByRole('img', { name: 'Group: Uploaded image' })
      ).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: 'Description' })).toHaveValue(
        'Sample description'
      );
      expect(
        screen.getByRole('textbox', { name: 'Contact information' })
      ).toHaveValue('Sample contact info');
      expect(screen.getByRole('checkbox', { name: 'Culture' })).toBeChecked();
      expect(
        screen.getByRole('checkbox', { name: 'Sample location' })
      ).toBeChecked();
    });

    it('should edit the group on submit', async () => {
      userEvent.clear(screen.getByRole('textbox', { name: 'Name' }));
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Name' }),
        'New name',
        { delay: 1 }
      );
      userEvent.clear(screen.getByRole('textbox', { name: 'Caption' }));
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Caption' }),
        'New info',
        { delay: 1 }
      );
      userEvent.clear(screen.getByRole('textbox', { name: 'Description' }));
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Description' }),
        'New description',
        { delay: 1 }
      );
      userEvent.clear(
        screen.getByRole('textbox', { name: 'Contact information' })
      );
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Contact information' }),
        'New contact info',
        { delay: 1 }
      );
      await act(async () => {
        userEvent.click(
          screen.getByRole('checkbox', { name: 'Administration' })
        );
      });
      await act(async () => {
        userEvent.click(
          screen.getByRole('checkbox', { name: 'Sample location' })
        );
      });
      await act(async () => {
        fireEvent.submit(screen.getByRole('form', { name: 'Edit group' }));
      });
      expect(setStatus).toHaveBeenCalledWith('submitting');
      expect(setStatus).toHaveBeenCalledWith('completed');
      expect(setResult).toHaveBeenCalledTimes(1);
      expect(setResult).toHaveBeenCalledWith({
        data: { groupId: 'T:123:Group' },
      });
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith('T:123:Group', {
        name: 'New name',
        info: 'New info',
        intro: 'New description',
        contactInfo: 'New contact info',
        image: { id: 'T:123:Image', resourceLocation: '' },
        categories: ['T:456:Category'],
        locations: [],
      });
    });
  });
});
