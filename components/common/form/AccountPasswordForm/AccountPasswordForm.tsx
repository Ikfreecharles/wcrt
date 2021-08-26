import { AccountPasswordFormData, CommonFormProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useFormErrorHandling } from 'hooks/form';
import { useAccountPasswordSubmit } from 'hooks/account';
import { FormWrapper } from 'components/common/form';
import { TextInput } from 'components/common/input';

/**
 * Renders a form to update the password of my own account. Pushes its result to
 * the OAuth provider.
 */
export const AccountPasswordForm: React.FC<CommonFormProps> = ({
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
  const updateAccountPassword = useAccountPasswordSubmit();

  const handleSubmit = async (formData: AccountPasswordFormData) => {
    setStatus('submitting');

    try {
      await updateAccountPassword(formData);
      setStatus('completed');
    } catch (error) {
      handleFormError(error);
    }
  };

  return (
    <FormWrapper
      title={t('label.password')}
      mode={mode}
      setStatus={setStatus}
      onSubmit={handleSubmit}
      externalError={fieldError}
      id={id}
    >
      <TextInput
        type="password"
        name="currentPassword"
        rules={{ required: true }}
        label={t('label.currentPassword')}
        autoComplete="current-password"
      />

      <TextInput
        type="password"
        name="newPassword"
        rules={{ required: true }}
        label={t('label.newPassword')}
        autoComplete="new-password"
      />

      <TextInput
        type="password"
        name="passwordConfirmation"
        rules={{
          required: true,
          matchField: 'newPassword',
        }}
        label={t('label.newPasswordConfirmation')}
        autoComplete="new-password"
      />
    </FormWrapper>
  );
};
