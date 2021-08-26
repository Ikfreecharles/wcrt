import { AccountContactFormData, CommonFormProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useMyAccountInfoQuery } from 'lib/graphql';
import { useFormErrorHandling } from 'hooks/form';
import { useAccountContactSubmit } from 'hooks/account';
import { InlineProgress } from 'components/common/misc';
import { FormWrapper } from 'components/common/form';
import { TextInput } from 'components/common/input';

/**
 * Renders a form to update the contact details of my own account. Syncs with
 * remote GraphQL data and the OAuth provider.
 */
export const AccountContactForm: React.FC<CommonFormProps> = ({
  mode,
  setStatus,
  setResult,
  id,
}) => {
  const { t } = useTranslation();
  const { handleFormError, fieldError } = useFormErrorHandling(
    setStatus,
    setResult
  );
  const { data, loading, client } = useMyAccountInfoQuery();
  const updateAccountContact = useAccountContactSubmit();

  const handleSubmit = async (formData: AccountContactFormData) => {
    setStatus('submitting');

    try {
      await updateAccountContact(formData);
      setStatus('completed');
      client.cache.modify({
        id: data?.me.id,
        fields: {
          email: () => formData.email,
        },
      });
    } catch (error) {
      handleFormError(error);
    }
  };

  if (loading) return <InlineProgress />;

  return (
    <FormWrapper
      title={t('label.contact')}
      mode={mode}
      defaultValues={{ email: data?.me.email }}
      setStatus={setStatus}
      onSubmit={handleSubmit}
      externalError={fieldError}
      id={id}
    >
      <TextInput
        type="email"
        name="email"
        rules={{ required: true }}
        label={t('label.emailAddress')}
        autoComplete="email"
      />

      <TextInput
        type="password"
        name="currentPassword"
        rules={{ required: true }}
        label={t('label.currentPassword')}
        autoComplete="current-password"
      />
    </FormWrapper>
  );
};
