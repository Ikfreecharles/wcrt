import { useSnackbar } from 'notistack';

import { CommonFormProps, FeedbackFormData } from 'types';
import { useTranslation } from 'lib/i18n';
import { FormWrapper } from 'components/common/form';
import { TextInput } from 'components/common/input';

/**
 * Renders a form to leave general feedback. Pushes its result to the ticket
 * system of the helpdesk.
 */
export const FeedbackForm: React.FC<CommonFormProps> = ({
  mode,
  setStatus,
  id,
}) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (formData: FeedbackFormData) => {
    setStatus('submitting');

    const sendFeedback = await fetch('/api/send/feedback', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (sendFeedback.ok) {
      setStatus('completed');
    } else {
      setStatus('invalid');
      enqueueSnackbar(t('notice.submitError'), { variant: 'error' });
    }
  };

  return (
    <FormWrapper
      title={t('action.giveFeedback')}
      mode={mode}
      setStatus={setStatus}
      onSubmit={handleSubmit}
      id={id}
    >
      <TextInput
        name="text"
        rules={{ required: true }}
        label={t('action.inputMessage')}
        rows={4}
      />
    </FormWrapper>
  );
};
