import { useState } from 'react';
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
import { ImpulseForm } from 'components/common/form';
import { Illustration } from 'components/common/media';

/**
 * Renders a dialog for creating a new impulse entity. Splits the impulse form
 * into several pages and adds explaination texts.
 */
export const ImpulseCreateDialog: React.FC<CommonDialogProps> = ({
  open,
  setOpen,
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
      title={t('action.createImpulse')}
      width="sm"
      actions={
        page <= formLength ? (
          {
            formId,
            page,
            setPage,
            nextButtonLabel:
              page === formLength ? t('action.publish') : undefined,
            disabled: formStatus === 'submitting',
          }
        ) : (
          <>
            <Button color="primary" onClick={handleClose}>
              {t('action.close')}
            </Button>

            {formResult?.data?.impulseId && (
              <NextLink
                href={getEntityPath(formResult.data.impulseId)}
                passHref
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  {t('action.viewImpulse')}
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
          <Illustration name="wireframe" />
        </Box>
      )}

      {page > 0 && page <= formLength && (
        <Stepper alternativeLabel activeStep={page - 1}>
          <Step>
            <StepButton onClick={handleNavigation(1)}>
              {t('label.problemDescription')}
            </StepButton>
          </Step>

          <Step>
            <StepButton onClick={handleNavigation(2)}>
              {t('label.moreDetails')}
            </StepButton>
          </Step>

          <Step>
            <StepButton onClick={handleNavigation(3)}>
              {t('label.possibleSolution')}
            </StepButton>
          </Step>
        </Stepper>
      )}

      {page === 0 && (
        <>
          <Typography paragraph>{t('explain.impulseCreate.intro')}</Typography>

          <Typography paragraph>
            {t('explain.impulseCreate.introSolution')}
          </Typography>
        </>
      )}

      {page === 1 && (
        <Typography paragraph>{t('explain.impulseCreate.problem')}</Typography>
      )}

      {page === 2 && (
        <Typography paragraph>
          {t('explain.impulseCreate.moreDetails')}
        </Typography>
      )}

      {page === 3 && (
        <Typography paragraph>{t('explain.impulseCreate.solution')}</Typography>
      )}

      {page === 4 && (
        <Alert
          narrow
          type="publish"
          title={t('explain.impulseCreate.success.title')}
          message={t('explain.impulseCreate.success.message')}
        />
      )}

      {page <= formLength && (
        <ImpulseForm
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
