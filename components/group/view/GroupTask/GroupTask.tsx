import { useState } from 'react';
import { Box, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import { useTaskQuery } from 'lib/graphql';
import { useFormStatus } from 'hooks/form';
import { useEntityDelete } from 'hooks/entity';
import { useElementId } from 'hooks/helper';
import { useRelativeNavigation } from 'hooks/navigation';
import { TaskForm } from 'components/common/form';
import { GroupWindow } from 'components/group/misc';
import { WindowFooter } from 'components/common/misc';

type Props = {
  /** The task ID */
  id: string;
};

/** Renders a form to edit task details. Meant to be used within a group context. */
export const GroupTask: React.FC<Props> = ({ id }) => {
  const { t } = useTranslation();
  const formId = useElementId('form');
  const { navigateBack } = useRelativeNavigation();
  const { enqueueSnackbar } = useSnackbar();
  const deleteEntity = useEntityDelete();
  const [deleting, setDeleting] = useState(false);
  const { formStatus, setFormStatus } = useFormStatus(() => {
    enqueueSnackbar(t('notice.changesSaved'));
  });
  const { data } = useTaskQuery({
    variables: {
      id,
    },
    fetchPolicy: 'cache-first',
  });

  const handleDeleteClick = async () => {
    setDeleting(true);
    await deleteEntity(id);
    enqueueSnackbar(t('notice.taskDeleted'));
    navigateBack();
  };

  return (
    <GroupWindow
      title={
        data?.task?.title
          ? `${t('label.task')}: ${data.task.title}`
          : t('label.task')
      }
      footer={
        <WindowFooter
          leadingElement={
            <Box color="error.main">
              <Button
                color="inherit"
                onClick={handleDeleteClick}
                disabled={deleting}
              >
                {t('action.delete')}
              </Button>
            </Box>
          }
        >
          <Button
            type="submit"
            form={formId}
            variant="contained"
            color="primary"
            disabled={formStatus === 'submitting'}
          >
            {t('action.save')}
          </Button>
        </WindowFooter>
      }
    >
      <TaskForm
        taskId={id}
        mode="onSubmit"
        setStatus={setFormStatus}
        id={formId}
      />
    </GroupWindow>
  );
};
