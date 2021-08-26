import { Button, Typography } from '@material-ui/core';

import { CommonDialogProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useFormStatus } from 'hooks/form';
import { useElementId } from 'hooks/helper';
import { Dialog, Alert } from 'components/common/misc';
import { FeedbackForm } from 'components/common/form';

/** Renders a dialog for leaving general feedback. */
export const FeedbackDialog: React.FC<CommonDialogProps> = ({
  open,
  setOpen,
}) => {
  const { t } = useTranslation();
  const formId = useElementId('form');
  const { formStatus, setFormStatus } = useFormStatus();

  const handleClose = () => setOpen(false);
  const handleCleanup = () => setFormStatus('invalid');

  return (
    <Dialog
      title={t('action.giveFeedback')}
      open={open}
      setOpen={setOpen}
      onExited={handleCleanup}
      actions={
        formStatus !== 'completed' ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            form={formId}
            disabled={formStatus !== 'valid'}
          >
            {t('action.send')}
          </Button>
        ) : (
          <Button color="primary" onClick={handleClose}>
            {t('action.close')}
          </Button>
        )
      }
    >
      {formStatus !== 'completed' ? (
        <>
          <Typography variant="body2" paragraph>
            {t('explain.feedback')}
          </Typography>

          <FeedbackForm mode="onChange" setStatus={setFormStatus} id={formId} />
        </>
      ) : (
        <Alert narrow type="messageSent" />
      )}
    </Dialog>
  );
};
