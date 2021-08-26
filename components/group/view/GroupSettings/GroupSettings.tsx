import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import { GroupContext } from 'context/group';
import { useFormStatus } from 'hooks/form';
import { useEntityDelete } from 'hooks/entity';
import { GroupForm } from 'components/common/form';
import { useElementId } from 'hooks/helper';
import { ConfirmationDialog } from 'components/common/dialog';
import { GroupWindow } from 'components/group/misc';
import { WindowFooter } from 'components/common/misc';

/** Renders a form to edit the group details. Meant to be used within a group context. */
export const GroupSettings: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const formId = useElementId('form');
  const { enqueueSnackbar } = useSnackbar();
  const { groupId } = useContext(GroupContext);
  const deleteEntity = useEntityDelete();
  const [deleting, setDeleting] = useState(false);
  const { formStatus, setFormStatus } = useFormStatus(() => {
    enqueueSnackbar(t('notice.changesSaved'));
  });

  const handleDeleteClick = () => setDeleting(true);

  const handleDeleteConfirm = async () => {
    setDeleting(false);
    await deleteEntity(groupId);
    enqueueSnackbar(t('group:notice.groupDeleted'));
    router.push('/groups');
  };

  return (
    <GroupWindow
      title={t('group:tool.settings.title')}
      footer={
        <WindowFooter
          leadingElement={
            <Box color="error.main">
              <Button color="inherit" onClick={handleDeleteClick}>
                {t('group:action.deleteGroup')}
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
      <GroupForm
        editId={groupId}
        mode="onSubmit"
        setStatus={setFormStatus}
        id={formId}
      />

      <ConfirmationDialog
        text={t('group:explain.groupDelete')}
        onConfirm={handleDeleteConfirm}
        open={deleting}
        setOpen={setDeleting}
      />
    </GroupWindow>
  );
};
