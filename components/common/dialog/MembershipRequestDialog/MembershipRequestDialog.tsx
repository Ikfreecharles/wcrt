import { Button, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { CommonDialogProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useFormStatus } from 'hooks/form';
import { useElementId } from 'hooks/helper';
import { Dialog } from 'components/common/misc';
import { MembershipRequestForm } from 'components/common/form';

type Props = CommonDialogProps & {
  /** The ID of the group to request a membership of */
  groupId: string;
};

/** Renders a dialog for requesting a membership of a certain group. */
export const MembershipRequestDialog: React.FC<Props> = ({
  groupId,
  open,
  setOpen,
}) => {
  const { t } = useTranslation();
  const formId = useElementId('form');
  const { enqueueSnackbar } = useSnackbar();
  const { formStatus, setFormStatus } = useFormStatus(() => {
    setOpen(false);
    enqueueSnackbar(t('notice.membershipRequested'));
  });

  return (
    <Dialog
      title={t('action.requestMembership')}
      open={open}
      setOpen={setOpen}
      actions={
        <Button
          type="submit"
          form={formId}
          variant="contained"
          color="primary"
          disabled={formStatus === 'invalid' || formStatus === 'submitting'}
        >
          {t('action.send')}
        </Button>
      }
    >
      <Typography variant="body2" paragraph>
        {t('explain.membershipRequest')}
      </Typography>

      <MembershipRequestForm
        groupId={groupId}
        mode="onChange"
        setStatus={setFormStatus}
        id={formId}
      />
    </Dialog>
  );
};
