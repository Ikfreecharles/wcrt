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

import { ArticleForm } from './ArticleForm';

jest.mock('hooks/article');

describe('<ArticleForm />', () => {
  const setStatus = jest.fn();
  const setResult = jest.fn();

  beforeAll(() => {
    apollo.response = {
      ...graphqlResponse.categories,
      ...graphqlResponse.addresses,
    };
  });

  describe('new article', () => {
    renderBeforeEach(
      <ArticleForm
        mode="onChange"
        setStatus={setStatus}
        setResult={setResult}
        id="form-123"
        groupId="T:123:Group"
      />
    );

    describe('default', () => {
      it('should render a form', () => {
        expect(
          screen.getByRole('form', { name: 'Create new article' })
        ).toBeInTheDocument();
      });

      it('should render its form elements', () => {
        expect(
          screen.getByRole('textbox', { name: 'Title' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('textbox', { name: 'Intro' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('textbox', { name: 'Article content' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: 'Add images' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: 'Add images' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('group', { name: 'Categories' })
        ).toBeInTheDocument();
        expect(
          screen.getByRole('group', { name: 'Location' })
        ).toBeInTheDocument();
      });

      it('should create a new article on submit', async () => {
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Title' }),
          'Sample title',
          { delay: 1 }
        );
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Intro' }),
          'Sample description',
          { delay: 1 }
        );
        await userEvent.type(
          screen.getByRole('textbox', { name: 'Article content' }),
          'Sample text',
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
            screen.getByRole('form', { name: 'Create new article' })
          );
        });
        expect(setStatus).toHaveBeenCalledWith('submitting');
        expect(setStatus).toHaveBeenCalledWith('completed');
        expect(setResult).toHaveBeenCalledTimes(1);
        expect(setResult).toHaveBeenCalledWith({
          data: { articleId: 'T:123:Article' },
        });
        expect(submit).toHaveBeenCalledTimes(1);
        expect(submit).toHaveBeenCalledWith(
          'article',
          {
            title: 'Sample title',
            intro: 'Sample description',
            text: 'Sample text',
            images: [],
            locations: ['T:123:Address'],
            categories: ['T:123:Category', 'T:456:Category'],
          },
          'T:123:Group'
        );
      });
    });
  });

  describe('existing article', () => {
    beforeAll(() => {
      apollo.response = {
        ...graphqlResponse.categories,
        ...graphqlResponse.addresses,
        article: {
          title: 'Sample title',
          intro: 'Sample description',
          text: 'Sample text',
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
      <ArticleForm
        editId="T:123:Article"
        mode="onChange"
        setStatus={setStatus}
        setResult={setResult}
        id="form-123"
      />
    );

    it('should render a form', () => {
      expect(
        screen.getByRole('form', { name: 'Edit article' })
      ).toBeInTheDocument();
    });

    it('should render its form elements', () => {
      expect(
        screen.getByRole('textbox', { name: 'Title' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Intro' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('textbox', { name: 'Article content' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'Add images' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('group', { name: 'Categories' })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('group', { name: 'Location' })
      ).toBeInTheDocument();
    });

    it('should render its default values', () => {
      expect(screen.getByRole('textbox', { name: 'Title' })).toHaveValue(
        'Sample title'
      );
      expect(screen.getByRole('textbox', { name: 'Intro' })).toHaveValue(
        'Sample description'
      );
      expect(
        screen.getByRole('textbox', { name: 'Article content' })
      ).toHaveValue('Sample text');
      expect(
        screen.getByRole('img', { name: 'Uploaded image' })
      ).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: 'Culture' })).toBeChecked();
      expect(
        screen.getByRole('checkbox', { name: 'Sample location' })
      ).toBeChecked();
    });

    it('should edit the article on submit', async () => {
      userEvent.clear(screen.getByRole('textbox', { name: 'Title' }));
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Title' }),
        'New title',
        { delay: 1 }
      );
      userEvent.clear(screen.getByRole('textbox', { name: 'Intro' }));
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Intro' }),
        'New description',
        { delay: 1 }
      );
      userEvent.clear(screen.getByRole('textbox', { name: 'Article content' }));
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Article content' }),
        'New text',
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
        fireEvent.submit(screen.getByRole('form', { name: 'Edit article' }));
      });
      expect(setStatus).toHaveBeenCalledWith('submitting');
      expect(setStatus).toHaveBeenCalledWith('completed');
      expect(setResult).toHaveBeenCalledTimes(1);
      expect(setResult).toHaveBeenCalledWith({
        data: { articleId: 'T:123:Article' },
      });
      expect(submit).toHaveBeenCalledTimes(1);
      expect(submit).toHaveBeenCalledWith(
        'T:123:Article',
        {
          title: 'New title',
          intro: 'New description',
          text: 'New text',
          images: [
            {
              id: 'T:123:Image',
              resourceLocation: 'https://source.unsplash.com/1600x900/?city',
            },
          ],
          locations: [],
          categories: ['T:456:Category'],
        },
        undefined
      );
    });
  });
});
