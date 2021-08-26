import { CommonFormProps, TaskFormData } from 'types';
import { useTranslation } from 'lib/i18n';
import { useTaskQuery } from 'lib/graphql';
import { useFormErrorHandling } from 'hooks/form';
import { useTaskSubmit } from 'hooks/task';
import { toString } from 'util/type';
import { InlineProgress } from 'components/common/misc';
import { FormWrapper } from 'components/common/form';
import { TextInput, BooleanInput } from 'components/common/input';

type Props = CommonFormProps & {
  /** The ID of the task to edit. */
  taskId: string;
};

/** Renders a form to edit an existing task. Syncs with remote GraphQL data. */
export const TaskForm: React.FC<Props> = ({
  taskId,
  mode,
  setStatus,
  setResult,
  id,
}) => {
  const { t } = useTranslation();
  const { handleFormError } = useFormErrorHandling(setStatus, setResult);
  const editTask = useTaskSubmit(taskId);
  const { data, loading } = useTaskQuery({
    variables: {
      id: taskId,
    },
    fetchPolicy: 'cache-first',
  });

  const handleSubmit = async (formData: TaskFormData) => {
    setStatus('submitting');

    try {
      await editTask(formData as TaskFormData);
      setStatus('completed');
    } catch (error) {
      handleFormError(error);
    }
  };

  if (loading) return <InlineProgress />;

  return (
    <FormWrapper
      title={t('action.editTask')}
      mode={mode}
      setStatus={setStatus}
      onSubmit={handleSubmit}
      defaultValues={{
        title: toString(data?.task?.title),
        completed: data?.task?.completed,
      }}
      id={id}
    >
      <TextInput
        name="title"
        rules={{ required: true, maxLength: 160 }}
        label={t('label.title')}
      />

      <BooleanInput name="completed" label={t('label.completed')} />
    </FormWrapper>
  );
};
