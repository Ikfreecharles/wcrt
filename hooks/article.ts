import { ArticleFormData } from 'types';
import {
  useArticleCreateMutation,
  useArticleModifyMutation,
  useArticleAssignMutation,
  ArticleTeaserFragmentDoc,
} from 'lib/graphql';
import { retryOnError } from 'util/graphql';
import { addGlobalTeaserFragment } from 'util/cache';

/**
 * Returns a hybrid function to submit article data via GraphQL. Creates a new
 * article by default, but can also update an existing one if initialized with an ID.
 */
export const useArticleSubmit = (existingArticleId?: string) => {
  const [createArticle, { client }] = useArticleCreateMutation();
  const [modifyArticle] = useArticleModifyMutation();
  const [assignArticle] = useArticleAssignMutation();

  const modifyArticleRelations = async (id: string, data: ArticleFormData) =>
    (
      await assignArticle({
        variables: {
          article: id,
          images: data.images.map((image) => image.id),
          address: data.locations.length ? data.locations[0] : null,
          categories: data.categories,
        },
      })
    ).data?.articleModifyCategorizedByCategoryRelation;

  const createNewArticle = async (data: ArticleFormData, groupId?: string) => {
    if (!groupId) throw new Error('Missing group assignment');

    const { data: createResult } = await createArticle({
      variables: {
        title: data.title,
        intro: data.intro,
        text: data.text,
        group: groupId,
      },
    });

    const newArticleId = createResult?.articleCreate.id;
    if (!newArticleId) throw new Error('Missing mutation response');

    const newData = await retryOnError(() =>
      modifyArticleRelations(newArticleId, data)
    );

    addGlobalTeaserFragment(
      client.cache,
      {
        type: 'Article',
        categories: data.categories,
        locations: data.locations,
      },
      {
        fragment: ArticleTeaserFragmentDoc,
        fragmentName: 'ArticleTeaser',
        data: newData,
      }
    );

    return newArticleId;
  };

  const modifyExistingArticle = async (data: ArticleFormData) => {
    if (!existingArticleId) throw new Error('Missing existing article');

    await Promise.all([
      modifyArticle({
        variables: {
          article: existingArticleId,
          title: data.title,
          intro: data.intro,
          text: data.text,
        },
      }),
      modifyArticleRelations(existingArticleId, data),
    ]);

    return existingArticleId;
  };

  return existingArticleId ? modifyExistingArticle : createNewArticle;
};
