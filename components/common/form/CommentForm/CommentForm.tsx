import { useState } from 'react';

import { CommentFormData, CommonFormProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useFormErrorHandling } from 'hooks/form';
import { useCommentSubmit } from 'hooks/comment';
import { FormWrapper } from 'components/common/form';
import { TextInput } from 'components/common/input';

type Props = CommonFormProps & {
  /** The ID of the content to comment */
  contentId: string;
};

/** Renders a form to create a comment. Pushes its result to remote GraphQL data. */
export const CommentForm: React.FC<Props> = ({
  contentId,
  mode,
  setStatus,
  setResult,
  id,
}) => {
  const { t } = useTranslation();
  const { handleFormError } = useFormErrorHandling(setStatus, setResult);
  const [submitCount, setSubmitCount] = useState(0);
  const createComment = useCommentSubmit();

  const handleSubmit = async (formData: CommentFormData) => {
    setStatus('submitting');

    try {
      const commentId = await createComment(contentId, formData);
      setResult?.({ data: { commentId } });
      setStatus('completed');
      setSubmitCount((prevState) => prevState + 1);
    } catch (error) {
      handleFormError(error);
    }
  };

  return (
    <FormWrapper
      title={t('action.reply')}
      mode={mode}
      setStatus={setStatus}
      onSubmit={handleSubmit}
      id={id}
      key={submitCount}
    >
      <TextInput
        name="text"
        rules={{ required: true, maxLength: 800 }}
        label={t('action.inputReply')}
        rows={4}
      />
    </FormWrapper>
  );
};
