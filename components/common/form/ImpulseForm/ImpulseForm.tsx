import { CommonFormProps, ImpulseFormData } from 'types';
import { useTranslation } from 'lib/i18n';
import { useImpulseQuery } from 'lib/graphql';
import { useFormErrorHandling } from 'hooks/form';
import { useImpulseSubmit } from 'hooks/impulse';
import { toArray, toString } from 'util/type';
import { InlineProgress } from 'components/common/misc';
import { FormWrapper, FormSection } from 'components/common/form';
import {
  TextInput,
  ImageInput,
  BooleanInput,
  CategoryInput,
  AddressInput,
} from 'components/common/input';

type Props = CommonFormProps & {
  /** The ID of an existing impulse to edit */
  editId?: string;
  /** The current page number (required for a multi-page form) */
  page?: number;
  /** The total number of pages (required for a multi-page form) */
  maxPages?: number;
};

/**
 * Renders a form to create or update an impulse. Can be split into multiple
 * pages. Syncs with remote GraphQL data.
 */
export const ImpulseForm: React.FC<Props> = ({
  editId,
  page,
  maxPages,
  mode,
  setStatus,
  setResult,
  id,
}) => {
  const { t } = useTranslation();
  const { handleFormError } = useFormErrorHandling(setStatus, setResult);
  const createOrEditImpulse = useImpulseSubmit(editId);
  const { data, loading } = useImpulseQuery({
    skip: !editId,
    variables: {
      id: editId!,
    },
    fetchPolicy: 'cache-first',
  });

  const handleSubmit = async (formData: Partial<ImpulseFormData>) => {
    setStatus('submitting');

    // Inside a multi-step form the final submit should happen on the last page.
    if (typeof page === 'undefined' || page === maxPages) {
      try {
        const impulseId = await createOrEditImpulse(
          formData as ImpulseFormData
        );
        setResult?.({ data: { impulseId } });
        setStatus('completed');
      } catch (error) {
        handleFormError(error);
      }
    } else {
      setStatus('completed');
    }
  };

  if (loading) return <InlineProgress />;

  return (
    <FormWrapper
      title={editId ? t('action.editImpulse') : t('action.createImpulse')}
      mode={mode}
      setStatus={setStatus}
      onSubmit={handleSubmit}
      defaultValues={{
        title: toString(data?.impulse?.title),
        intro: toString(data?.impulse?.intro),
        images: data?.impulse?.imagedBy.edges.map((edge) => edge.node),
        categories: data?.impulse?.categorizedBy.edges.map(
          ({ node }) => node.id
        ),
        locations: toArray(data?.impulse?.locatedByAddress?.id),
      }}
      id={id}
    >
      <FormSection page={1} current={page}>
        <TextInput
          name="intro"
          rules={{ required: true, maxLength: 800 }}
          label={t('action.inputProblemDescription')}
          helperText={t('explain.impulseForm.intro')}
          rows={6}
        />

        <ImageInput
          name="images"
          rules={{ maxLength: 10 }}
          label={t('action.addImages')}
        />
      </FormSection>

      <FormSection page={2} current={page}>
        <TextInput
          name="title"
          rules={{ required: true, maxLength: 160 }}
          label={t('label.impulseTitle')}
          helperText={t('explain.impulseForm.title')}
        />

        <CategoryInput
          name="categories"
          rules={{ maxLength: 3 }}
          label={t('label.categories')}
          helperText={t('explain.impulseForm.categories')}
        />

        <AddressInput
          name="locations"
          rules={{ maxLength: 1 }}
          label={t('label.location')}
          helperText={t('explain.impulseForm.locations')}
        />
      </FormSection>

      {!editId && (
        <FormSection page={3} current={page}>
          <BooleanInput
            name="hasSolution"
            label={t('explain.impulseForm.solutionLabel')}
          />

          <FormSection when="hasSolution">
            <TextInput
              name="solution"
              rules={{ required: true, maxLength: 800 }}
              label={t('action.inputSolution')}
              helperText={t('explain.impulseForm.solution')}
              rows={6}
            />
          </FormSection>
        </FormSection>
      )}
    </FormWrapper>
  );
};
