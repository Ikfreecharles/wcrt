import { ComponentProps, useState } from 'react';
import NextLink from 'next/link';
import {
  Box,
  Button,
  Step,
  StepButton,
  Stepper,
  Typography,
} from '@material-ui/core';

import { CommonDialogProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { getEntityPath } from 'util/url';
import { useFormStatus } from 'hooks/form';
import { useElementId } from 'hooks/helper';
import { Dialog, Alert } from 'components/common/misc';
import { GroupForm } from 'components/common/form';
import { Illustration } from 'components/common/media';

type Props = CommonDialogProps & {
  /** The meta data of an impulse to set as `Group.covers` */
  relatedImpulse?: ComponentProps<typeof GroupForm>['relatedImpulse'];
};

/**
 * Renders a dialog for creating a new group entity. Splits the group form into
 * several pages and adds explaination texts.
 */
export const GroupCreateDialog: React.FC<Props> = ({
  open,
  setOpen,
  relatedImpulse,
}) => {
  const { t } = useTranslation();
  const formId = useElementId('form');
  const [page, setPage] = useState(0);
  const { formStatus, formResult, setFormStatus, setFormResult } =
    useFormStatus(() => {
      setPage((prevState) => prevState + 1);
    });

  const formLength = 3;

  const handleNavigation = (i: number) => () => setPage(i);
  const handleClose = () => setOpen(false);
  const handleCleanup = () => setPage(0);

  return (
    <Dialog
      title={t('action.createGroup')}
      width="sm"
      actions={
        page <= formLength ? (
          {
            formId,
            page,
            setPage,
            nextButtonLabel:
              page === formLength ? t('action.create') : undefined,
            disabled: formStatus === 'submitting',
          }
        ) : (
          <>
            <Button color="primary" onClick={handleClose}>
              {t('action.close')}
            </Button>

            {formResult?.data?.groupId && (
              <NextLink href={getEntityPath(formResult.data.groupId)} passHref>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  {t('action.viewGroup')}
                </Button>
              </NextLink>
            )}
          </>
        )
      }
      open={open}
      setOpen={setOpen}
      onExited={handleCleanup}
    >
      {page === 0 && (
        <Box mb={2}>
          <Illustration name="whiteboard" />
        </Box>
      )}

      {page > 0 && page <= formLength && (
        <Stepper alternativeLabel activeStep={page - 1}>
          <Step>
            <StepButton onClick={handleNavigation(1)}>
              {t('label.briefIntro')}
            </StepButton>
          </Step>

          <Step>
            <StepButton onClick={handleNavigation(2)}>
              {t('label.description')}
            </StepButton>
          </Step>

          <Step>
            <StepButton onClick={handleNavigation(3)}>
              {t('label.moreDetails')}
            </StepButton>
          </Step>
        </Stepper>
      )}

      {page === 0 && (
        <Typography paragraph>
          {relatedImpulse
            ? t('explain.groupCreate.introWithImpulse')
            : t('explain.groupCreate.intro')}
        </Typography>
      )}

      {page === 1 && (
        <Typography paragraph>
          {relatedImpulse
            ? t('explain.groupCreate.summaryWithImpulse')
            : t('explain.groupCreate.summary')}
        </Typography>
      )}

      {page === 2 && (
        <Typography paragraph>
          {relatedImpulse
            ? t('explain.groupCreate.descriptionWithImpulse')
            : t('explain.groupCreate.description')}
        </Typography>
      )}

      {page === 3 && (
        <Typography paragraph>
          {relatedImpulse
            ? t('explain.groupCreate.moreDetailsWithImpulse')
            : t('explain.groupCreate.moreDetails')}
        </Typography>
      )}

      {page === 4 && (
        <Alert
          narrow
          type="publish"
          title={t('explain.groupCreate.success.title')}
          message={t('explain.groupCreate.success.message')}
        />
      )}

      {page <= formLength && (
        <GroupForm
          relatedImpulse={relatedImpulse}
          page={page}
          maxPages={formLength}
          mode="onSubmit"
          setStatus={setFormStatus}
          setResult={setFormResult}
          id={formId}
        />
      )}
    </Dialog>
  );
};
