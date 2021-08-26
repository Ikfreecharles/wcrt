import { CommonFormProps, ArticleFormData } from 'types';
import { useTranslation } from 'lib/i18n';
import { useArticleQuery } from 'lib/graphql';
import { useFormErrorHandling } from 'hooks/form';
import { useArticleSubmit } from 'hooks/article';
import { toArray, toString } from 'util/type';
import { InlineProgress } from 'components/common/misc';
import { FormWrapper } from 'components/common/form';
import {
  TextInput,
  ImageInput,
  CategoryInput,
  AddressInput,
} from 'components/common/input';

type Props = CommonFormProps & {
  /** The ID of the author group (required when creating a new article) */
  groupId?: string;
  /** The ID of an existing article to edit */
  editId?: string;
};

/** Renders a form to create or update an article. Syncs with remote GraphQL data. */
export const ArticleForm: React.FC<Props> = ({
  groupId,
  editId,
  mode,
  setStatus,
  setResult,
  id,
}) => {
  const { t } = useTranslation();
  const { handleFormError } = useFormErrorHandling(setStatus, setResult);
  const createOrEditArticle = useArticleSubmit(editId);
  const { data, loading } = useArticleQuery({
    skip: !editId,
    variables: {
      id: editId!,
    },
    fetchPolicy: 'cache-first',
  });

  const handleSubmit = async (formData: ArticleFormData) => {
    setStatus('submitting');

    try {
      const articleId = await createOrEditArticle(
        formData as ArticleFormData,
        groupId
      );
      setResult?.({ data: { articleId } });
      setStatus('completed');
    } catch (error) {
      handleFormError(error);
    }
  };

  if (loading) return <InlineProgress />;

  return (
    <FormWrapper
      title={editId ? t('action.editArticle') : t('action.createArticle')}
      mode={mode}
      setStatus={setStatus}
      onSubmit={handleSubmit}
      defaultValues={{
        title: toString(data?.article?.title),
        intro: toString(data?.article?.intro),
        text: toString(data?.article?.text),
        images: data?.article?.imagedBy.edges.map((edge) => edge.node),
        categories: data?.article?.categorizedBy.edges.map(
          ({ node }) => node.id
        ),
        locations: toArray(data?.article?.locatedByAddress?.id),
      }}
      id={id}
    >
      <TextInput
        name="title"
        rules={{ required: true, maxLength: 160 }}
        label={t('label.title')}
        helperText={t('explain.articleForm.title')}
      />

      <TextInput
        name="intro"
        rules={{ required: true, maxLength: 640 }}
        label={t('label.intro')}
        helperText={t('explain.articleForm.intro')}
        rows={3}
      />

      <TextInput
        name="text"
        rules={{ required: true }}
        label={t('label.articleContent')}
        helperText={t('explain.articleForm.text')}
        rows={6}
      />

      <ImageInput
        name="images"
        rules={{ maxLength: 10 }}
        label={t('action.addImages')}
      />

      <CategoryInput
        name="categories"
        rules={{ maxLength: 3 }}
        label={t('label.categories')}
        helperText={t('explain.articleForm.categories')}
      />

      <AddressInput
        name="locations"
        rules={{ maxLength: 1 }}
        label={t('label.location')}
        helperText={t('explain.articleForm.locations')}
      />
    </FormWrapper>
  );
};
