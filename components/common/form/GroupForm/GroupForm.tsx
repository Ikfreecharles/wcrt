import { CommonFormProps, GroupFormData } from 'types';
import { useTranslation } from 'lib/i18n';
import { ImpulseFragment, useGroupQuery } from 'lib/graphql';
import { useFormErrorHandling } from 'hooks/form';
import { useGroupSubmit } from 'hooks/group';
import { toArray, toString } from 'util/type';
import { InlineProgress } from 'components/common/misc';
import { FormWrapper, FormSection } from 'components/common/form';
import {
  TextInput,
  AddressInput,
  AvatarInput,
  CategoryInput,
} from 'components/common/input';

type Props = CommonFormProps & {
  /** The ID of an existing group to edit */
  editId?: string;
  /** The meta data of an impulse to set as `Group.covers` */
  relatedImpulse?: {
    id: string;
    categorizedBy?: ImpulseFragment['categorizedBy'];
    locatedByAddress?: ImpulseFragment['locatedByAddress'];
  };
  /** The current page number (required for a multi-page form) */
  page?: number;
  /** The total number of pages (required for a multi-page form) */
  maxPages?: number;
};

/**
 * Renders a form to create or update a group. Can be split into multiple pages.
 * Syncs with remote GraphQL data.
 */
export const GroupForm: React.FC<Props> = ({
  editId,
  relatedImpulse,
  page,
  maxPages,
  mode,
  setStatus,
  setResult,
  id,
}) => {
  const { t } = useTranslation();
  const { handleFormError } = useFormErrorHandling(setStatus, setResult);
  const createOrEditGroup = useGroupSubmit(editId, relatedImpulse?.id);
  const { data, loading } = useGroupQuery({
    skip: !editId,
    variables: {
      id: editId!,
    },
    fetchPolicy: 'cache-first',
  });

  const handleSubmit = async (formData: Partial<GroupFormData>) => {
    setStatus('submitting');

    // Inside a multi-page form the final submit should happen on the last page.
    if (typeof page === 'undefined' || page === maxPages) {
      try {
        const groupId = await createOrEditGroup(formData as GroupFormData);
        setResult?.({ data: { groupId } });
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
      title={editId ? t('action.editGroup') : t('action.createGroup')}
      mode={mode}
      setStatus={setStatus}
      onSubmit={handleSubmit}
      defaultValues={{
        name: toString(data?.group?.name),
        info: toString(data?.group?.info),
        intro: toString(data?.group?.intro),
        image: data?.group?.imagedBy,
        categories: toArray(
          data?.group?.categorizedBy?.id ||
            relatedImpulse?.categorizedBy?.edges[0]?.node.id
        ),
        locations: toArray(
          data?.group?.locatedByAddress?.id ||
            relatedImpulse?.locatedByAddress?.id
        ),
        contactInfo: toString(data?.group?.contactInfo),
      }}
      id={id}
    >
      <FormSection page={1} current={page}>
        <TextInput
          name="name"
          rules={{ required: true, maxLength: 80 }}
          label={t('label.name')}
          helperText={t('explain.groupForm.name')}
        />

        <TextInput
          name="info"
          rules={{ maxLength: 80 }}
          label={t('label.caption')}
          helperText={t('explain.groupForm.info')}
        />

        <AvatarInput type="Group" name="image" label={t('label.avatar')} />
      </FormSection>

      <FormSection page={2} current={page}>
        <TextInput
          name="intro"
          rules={{ maxLength: 640 }}
          label={t('label.description')}
          helperText={
            relatedImpulse
              ? t('explain.groupForm.introWithImpulse')
              : t('explain.groupForm.intro')
          }
          rows={4}
        />

        <TextInput
          name="contactInfo"
          rules={{ maxLength: 640 }}
          label={t('label.contactInfo')}
          helperText={
            relatedImpulse
              ? t('explain.groupForm.contactInfoWithImpulse')
              : t('explain.groupForm.contactInfo')
          }
          rows={4}
        />
      </FormSection>

      <FormSection page={3} current={page}>
        <CategoryInput
          name="categories"
          rules={{ maxLength: 1 }}
          label={t('label.category')}
        />

        <AddressInput
          name="locations"
          rules={{ maxLength: 1 }}
          label={t('label.location')}
        />
      </FormSection>
    </FormWrapper>
  );
};
