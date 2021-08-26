import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@material-ui/core';

import { CommonDialogProps } from 'types';
import { useTranslation } from 'lib/i18n';

type Props = CommonDialogProps & {
  /** A text to explain the consequences of the action. */
  text: string;
  /** The final action to execute after confirmation. */
  onConfirm: () => void;
};

/** Renders a dialog for confirming a certain action (e.g. entity deletion). */
export const ConfirmationDialog: React.FC<Props> = ({
  text,
  onConfirm,
  open,
  setOpen,
}) => {
  const { t } = useTranslation();
  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ 'aria-label': t('label.confirmation') }}
    >
      <DialogContent>
        <Box px={3} pb={2}>
          <Typography component="h2" variant="h5">
            {t('label.areYouSure')}
          </Typography>
        </Box>

        <Box px={3} pb={3}>
          <Typography variant="body1" color="textSecondary">
            {text}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          {t('action.cancel')}
        </Button>

        <Button variant="contained" color="primary" onClick={onConfirm}>
          {t('action.confirm')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
