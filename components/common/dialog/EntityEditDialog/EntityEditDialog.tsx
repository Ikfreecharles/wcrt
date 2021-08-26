import NextLink from 'next/link';
import { useSnackbar } from 'notistack';
import { Box, Button } from '@material-ui/core';

import { CommonDialogProps, CommonFormProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useFormStatus } from 'hooks/form';
import { useElementId } from 'hooks/helper';
import { getEntityPath } from 'util/url';
import { Dialog } from 'components/common/misc';
import { ArticleForm, ImpulseForm } from 'components/common/form';

type Props = CommonDialogProps & {
  /** The ID of the entity to edit */
  id: string;
};

/**
 * Renders a dialog to edit an entity. Determines the right form component on
 * basis of the ID.
 */
export const EntityEditDialog: React.FC<Props> = ({ id, open, setOpen }) => {
  const { t } = useTranslation();
  const formId = useElementId('form');
  const { enqueueSnackbar } = useSnackbar();
  const { formStatus, setFormStatus } = useFormStatus(() => {
    enqueueSnackbar(t('notice.changesSaved'));
  });

  const type = id.split(':')[2];
  let title: string;
  let Form: React.FC<CommonFormProps & { editId?: string }>;

  switch (type) {
    case 'Impulse':
      title = t('action.editImpulse');
      Form = ImpulseForm;
      break;
    case 'Article':
      title = t('action.editArticle');
      Form = ArticleForm;
      break;
    default:
      throw new Error('Unknown entity type');
  }

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      title={title}
      width="sm"
      actions={
        <>
          <Box flex="1">
            <NextLink href={getEntityPath(id)} passHref>
              <Button onClick={handleClose}>{t('action.view')}</Button>
            </NextLink>
          </Box>

          <Button
            color="primary"
            onClick={handleClose}
            disabled={formStatus === 'submitting'}
          >
            {t('action.cancel')}
          </Button>

          <Button
            type="submit"
            form={formId}
            variant="contained"
            color="primary"
            disabled={formStatus === 'submitting'}
          >
            {t('action.save')}
          </Button>
        </>
      }
      open={open}
      setOpen={setOpen}
    >
      <Form editId={id} mode="onSubmit" setStatus={setFormStatus} id={formId} />
    </Dialog>
  );
};
