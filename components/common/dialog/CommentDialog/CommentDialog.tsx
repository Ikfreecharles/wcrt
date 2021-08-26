import { Button, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { CommonDialogProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useFormStatus } from 'hooks/form';
import { useElementId } from 'hooks/helper';
import { Dialog } from 'components/common/misc';
import { CommentForm } from 'components/common/form';

type Props = CommonDialogProps & {
  /** The ID of the content to comment */
  contentId: string;
};

/** Renders a dialog for adding a comment to a content entity. */
export const CommentDialog: React.FC<Props> = ({
  contentId,
  open,
  setOpen,
}) => {
  const { t } = useTranslation();
  const formId = useElementId('form');
  const { enqueueSnackbar } = useSnackbar();
  const { formStatus, setFormStatus } = useFormStatus(() => {
    setOpen(false);
    enqueueSnackbar(t('notice.replyPublished'));
  });

  const contentType = contentId.split(':')[2];
  const handleCleanup = () => setFormStatus('invalid');

  return (
    <Dialog
      title={t('action.reply')}
      open={open}
      setOpen={setOpen}
      onExited={handleCleanup}
      actions={
        <Button
          type="submit"
          form={formId}
          variant="contained"
          color="primary"
          disabled={formStatus !== 'valid'}
        >
          {t('action.reply')}
        </Button>
      }
    >
      {contentType === 'Impulse' && (
        <Typography variant="body2" paragraph>
          {t('explain.impulse.reply')}
        </Typography>
      )}

      <CommentForm
        contentId={contentId}
        mode="onChange"
        setStatus={setFormStatus}
        id={formId}
      />
    </Dialog>
  );
};
