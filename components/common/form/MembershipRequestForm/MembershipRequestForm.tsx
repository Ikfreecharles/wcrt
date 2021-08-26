import { MembershipRequestFormData, CommonFormProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useFormErrorHandling } from 'hooks/form';
import { useMembershipRequest } from 'hooks/membership';
import { FormWrapper } from 'components/common/form';
import { TextInput } from 'components/common/input';

type Props = CommonFormProps & {
  /** The ID of the group to request a membership of */
  groupId: string;
};

/** Renders a form to request a membership. Pushes its result to remote GraphQL data. */
export const MembershipRequestForm: React.FC<Props> = ({
  groupId,
  mode,
  setStatus,
  setResult,
  id,
}) => {
  const { t } = useTranslation();
  const { handleFormError } = useFormErrorHandling(setStatus, setResult);
  const createMembershipRequest = useMembershipRequest(groupId);

  const handleSubmit = async (formData: MembershipRequestFormData) => {
    setStatus('submitting');

    try {
      const createResult = await createMembershipRequest(formData.text);
      setResult?.({ data: { requestId: createResult?.id } });
      setStatus('completed');
    } catch (error) {
      handleFormError(error);
    }
  };

  return (
    <FormWrapper
      title={t('action.requestMembership')}
      mode={mode}
      setStatus={setStatus}
      onSubmit={handleSubmit}
      id={id}
    >
      <TextInput
        name="text"
        rules={{ maxLength: 800 }}
        label={t('label.message')}
        helperText={t('label.optional')}
        rows={4}
      />
    </FormWrapper>
  );
};
