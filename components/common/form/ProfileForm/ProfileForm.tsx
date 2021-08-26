import { ProfileFormData, CommonFormProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useMyAccountInfoQuery } from 'lib/graphql';
import { useProfileSubmit } from 'hooks/profile';
import { useFormErrorHandling } from 'hooks/form';
import { toString, toArray } from 'util/type';
import { InlineProgress } from 'components/common/misc';
import { FormWrapper } from 'components/common/form';
import { AddressInput, AvatarInput, TextInput } from 'components/common/input';

/** Renders a form to edit my own profile. Syncs with remote GraphQL data. */
export const ProfileForm: React.FC<CommonFormProps> = ({
  mode,
  setStatus,
  setResult,
  id,
}) => {
  const { t } = useTranslation();
  const { handleFormError } = useFormErrorHandling(setStatus, setResult);
  const updateProfile = useProfileSubmit();
  const { data, loading } = useMyAccountInfoQuery({
    fetchPolicy: 'cache-first',
  });

  const handleSubmit = async (formData: ProfileFormData) => {
    setStatus('submitting');

    try {
      await updateProfile(formData);
      setStatus('completed');
    } catch (error) {
      handleFormError(error);
    }
  };

  if (loading) return <InlineProgress />;

  return (
    <FormWrapper
      title={t('label.profile')}
      mode={mode}
      defaultValues={{
        name: toString(data?.me.represents?.name),
        info: toString(data?.me.represents?.info),
        image: data?.me.represents?.imagedBy,
        locations: toArray(data?.me.represents?.locatedByAddress?.id),
        intro: toString(data?.me.represents?.intro),
      }}
      setStatus={setStatus}
      onSubmit={handleSubmit}
      id={id}
    >
      <AvatarInput
        name="image"
        label={t('label.avatar')}
        id={data?.me.represents?.id}
      />

      <TextInput
        name="name"
        rules={{ required: true, maxLength: 80 }}
        label={t('label.fullName')}
        helperText={t('explain.profileForm.name')}
      />

      <TextInput
        name="info"
        rules={{ maxLength: 80 }}
        label={t('label.caption')}
        helperText={t('explain.profileForm.info')}
      />

      <AddressInput
        name="locations"
        rules={{ maxLength: 1 }}
        label={t('label.location')}
      />

      <TextInput
        name="intro"
        rules={{ maxLength: 640 }}
        label={t('label.aboutMe')}
        helperText={t('explain.profileForm.intro')}
        rows={4}
      />
    </FormWrapper>
  );
};
