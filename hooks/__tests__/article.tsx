import { renderHook, TestingContext, auth, apollo, submit } from 'testing/util';
import {
  ArticleCreateDocument,
  ArticleModifyDocument,
  ArticleAssignDocument,
} from 'lib/graphql';
import { useArticleSubmit } from 'hooks/article';

jest.mock('hooks/profile');

describe('useArticleSubmit', () => {
  beforeAll(() => {
    auth.session = auth.getActiveSession();
    apollo.response = {
      articleCreate: {
        __typename: 'Article',
        id: 'T:123:Article',
      },
      articleModifyCategorizedByCategoryRelation: {
        __typename: 'Article',
        id: 'T:123:Article',
      },
    };
  });

  describe('new article', () => {
    test('create and assign', async () => {
      const { result } = renderHook(() => useArticleSubmit(), {
        wrapper: TestingContext,
      });
      await result.current(
        {
          title: 'Sample title',
          intro: 'Sample description',
          text: 'Sample text',
          images: [],
          locations: [],
          categories: [],
        },
        'T:123:Group'
      );
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(ArticleCreateDocument, {
        title: 'Sample title',
        intro: 'Sample description',
        text: 'Sample text',
        group: 'T:123:Group',
      });
      expect(apollo.mutate).toHaveBeenCalledWith(ArticleAssignDocument, {
        article: 'T:123:Article',
        images: [],
        address: null,
        categories: [],
      });
      expect(submit).toHaveBeenCalledTimes(0);
    });

    test('create and assign with details', async () => {
      const { result } = renderHook(() => useArticleSubmit(), {
        wrapper: TestingContext,
      });
      await result.current(
        {
          title: 'Sample title',
          intro: 'Sample description',
          text: 'Sample text',
          images: [
            { id: 'T:123:Image', resourceLocation: '' },
            { id: 'T:456:Image', resourceLocation: '' },
          ],
          locations: ['T:123:Address'],
          categories: ['T:123:Category', 'T:456:Category'],
        },
        'T:123:Group'
      );
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(ArticleAssignDocument, {
        article: 'T:123:Article',
        images: ['T:123:Image', 'T:456:Image'],
        address: 'T:123:Address',
        categories: ['T:123:Category', 'T:456:Category'],
      });
      expect(submit).toHaveBeenCalledTimes(0);
    });
  });

  describe('existing article', () => {
    test('modify and assign', async () => {
      const { result } = renderHook(() => useArticleSubmit('T:456:Article'), {
        wrapper: TestingContext,
      });
      await result.current({
        title: 'New title',
        intro: 'New description',
        text: 'Sample text',
        images: [],
        locations: [],
        categories: [],
      });
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(ArticleModifyDocument, {
        article: 'T:456:Article',
        title: 'New title',
        intro: 'New description',
        text: 'Sample text',
      });
      expect(apollo.mutate).toHaveBeenCalledWith(ArticleAssignDocument, {
        article: 'T:456:Article',
        images: [],
        address: null,
        categories: [],
      });
    });

    test('modify and assign with details', async () => {
      const { result } = renderHook(() => useArticleSubmit('T:456:Article'), {
        wrapper: TestingContext,
      });
      await result.current({
        title: 'New title',
        intro: 'New description',
        text: 'New text',
        images: [
          { id: 'T:123:Image', resourceLocation: '' },
          { id: 'T:456:Image', resourceLocation: '' },
        ],
        categories: ['T:456:Category', 'T:789:Category'],
        locations: ['T:456:Address'],
      });
      expect(apollo.mutate).toHaveBeenCalledTimes(2);
      expect(apollo.mutate).toHaveBeenCalledWith(ArticleAssignDocument, {
        article: 'T:456:Article',
        images: ['T:123:Image', 'T:456:Image'],
        address: 'T:456:Address',
        categories: ['T:456:Category', 'T:789:Category'],
      });
    });
  });
});
