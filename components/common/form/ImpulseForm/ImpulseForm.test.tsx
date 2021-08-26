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

import { ImpulseForm } from './ImpulseForm';

jest.mock('hooks/impulse');
jest.mock('hooks/comment');

describe('<ImpulseForm />', () => {
  const setStatus = jest.fn();
  const setResult = jest.fn();

  beforeAll(() => {
    apollo.response = {
      ...graphqlResponse.categories,
      ...graphqlResponse.addresses,
    };
  });

  describe('new impulse', () => {
    renderBeforeEach(
      <ImpulseForm
        mode="onChange"
        setStatus={setStatus}
        setResult={setResult}
        id="form-123"
      />
    );

    describe('default', () => {
      it('should render a form', () => {
        expect(
          screen.getByRole('form', { name: 'Create new impulse' })
        ).toBeInTheDocument();
      });

      it('should render its form elements', () => {
        expect(
          screen.getByRole('textbox', { name: 'Describe the problem …' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: 'Add images' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('textbox', { name: 'Impulse title' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('group', { name: 'Categories' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('group', { name: 'Location' })
        ).toBeInTheDocument();
      });

      it('should not render the solution input initially', () => {
        expect(
          screen.queryByRole('textbox', {
            name: 'Describe a possible solution …',
          })
        ).not.toBeInTheDocument();
      });

      it('should create a new impulse on submit', async () => {
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Describe the problem …' }),
          'Sample description',
          { delay: 1 }
        );
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Impulse title' }),
          'Sample title',
          { delay: 1 }
        );
        await act(async () => {
          userEvent.click(screen.getByRole('checkbox', { name: 'Culture' }));
        });
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
          fireEvent.submit(
            screen.getByRole('form', { name: 'Create new impulse' })
          );
        });
        expect(setStatus).toHaveBeenCalledWith('submitting');
        expect(setStatus).toHaveBeenCalledWith('completed');
        expect(setResult).toHaveBeenCalledTimes(1);
        expect(setResult).toHaveBeenCalledWith({
          data: { impulseId: 'T:123:Impulse' },
        });
        expect(submit).toHaveBeenCalledTimes(1);
        expect(submit).toHaveBeenCalledWith('impulse', {
          title: 'Sample title',
          intro: 'Sample description',
          images: [],
          locations: ['T:123:Address'],
          categories: ['T:123:Category', 'T:456:Category'],
          hasSolution: false,
        });
      });
    });

    describe('with solution', () => {
      it('should render the solution input on click', async () => {
        await act(async () => {
          userEvent.click(
            screen.getByRole('checkbox', {
              name: 'I already have a proposed solution and would like to encourage more people to join me.',
            })
          );
        });
        expect(
          screen.getByRole('textbox', {
            name: 'Describe a possible solution …',
          })
        ).toBeInTheDocument();
      });

      it('should create a new impulse on submit', async () => {
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Describe the problem …' }),
          'Sample description',
          { delay: 1 }
        );
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Impulse title' }),
          'Sample title',
          { delay: 1 }
        );
        await act(async () => {
          userEvent.click(
            screen.getByRole('checkbox', {
              name: 'I already have a proposed solution and would like to encourage more people to join me.',
            })
          );
        });
        await userEvent.type(
          screen.getByRole('textbox', {
            name: 'Describe a possible solution …',
          }),
          'Sample solution',
          { delay: 1 }
        );
        await act(async () => {
          fireEvent.submit(
            screen.getByRole('form', { name: 'Create new impulse' })
          );
        });
        expect(setStatus).toHaveBeenCalledWith('submitting');
        expect(setStatus).toHaveBeenCalledWith('completed');
        expect(setResult).toHaveBeenCalledTimes(1);
        expect(setResult).toHaveBeenCalledWith({
          data: { impulseId: 'T:123:Impulse' },
        });
        expect(submit).toHaveBeenCalledTimes(1);
        expect(submit).toHaveBeenCalledWith('impulse', {
          title: 'Sample title',
          intro: 'Sample description',
          images: [],
          locations: [],
          categories: [],
          hasSolution: true,
          solution: 'Sample solution',
        });
      });
    });
  });

  describe('existing impulse', () => {
    beforeAll(() => {
      apollo.response = {
        ...graphqlResponse.categories,
        ...graphqlResponse.addresses,
        impulse: {
          title: 'Sample title',
          intro: 'Sample description',
          imagedBy: {
            edges: [
              {
                node: {
                  id: 'T:123:Image',
                  resourceLocation:
                    'https://source.unsplash.com/1600x900/?city',
                },
              },
            ],
          },
          locatedByAddress: { id: 'T:123:Address' },
          categorizedBy: { edges: [{ node: { id: 'T:123:Category' } }] },
        },
      };
    });

    renderBeforeEach(
      <ImpulseForm
        editId="T:123:Impulse"
        mode="onChange"
        setStatus={setStatus}
        setResult={setResult}
        id="form-123"
      />
    );

    it('should render a form', () => {
      expect(
        screen.getByRole('form', { name: 'Edit impulse' })
      ).toBeInTheDocument();
    });

    it('should render its form elements', () => {
      expect(
        screen.getByRole('textbox', { name: 'Describe the problem …' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Add images' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Impulse title' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('group', { name: 'Categories' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('group', { name: 'Location' })
      ).toBeInTheDocument();
    });

    it('should render its default values', () => {
      expect(
        screen.getByRole('textbox', { name: 'Describe the problem …' })
      ).toHaveValue('Sample description');
      expect(
        screen.getByRole('img', { name: 'Uploaded image' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Impulse title' })
      ).toHaveValue('Sample title');
      expect(screen.getByRole('checkbox', { name: 'Culture' })).toBeChecked();
      expect(
        screen.getByRole('checkbox', { name: 'Sample location' })
      ).toBeChecked();
    });

    it('should edit the impulse on submit', async () => {
      userEvent.clear(
        screen.getByRole('textbox', { name: 'Describe the problem …' })
      );
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Describe the problem …' }),
        'New description',
        { delay: 1 }
      );
      userEvent.clear(screen.getByRole('textbox', { name: 'Impulse title' }));
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Impulse title' }),
        'New title',
        { delay: 1 }
      );
      await act(async () => {
        userEvent.click(screen.getByRole('checkbox', { name: 'Culture' }));
      });
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
        fireEvent.submit(screen.getByRole('form', { name: 'Edit impulse' }));
      });
      expect(setStatus).toHaveBeenCalledWith('submitting');
      expect(setStatus).toHaveBeenCalledWith('completed');
      expect(setResult).toHaveBeenCalledTimes(1);
      expect(setResult).toHaveBeenCalledWith({
        data: { impulseId: 'T:123:Impulse' },
      });
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith('T:123:Impulse', {
        title: 'New title',
        intro: 'New description',
        images: [
          {
            id: 'T:123:Image',
            resourceLocation: 'https://source.unsplash.com/1600x900/?city',
          },
        ],
        locations: [],
        categories: ['T:456:Category'],
      });
    });
  });
});
