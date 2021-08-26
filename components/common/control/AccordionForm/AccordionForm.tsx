import { useSnackbar } from 'notistack';
import {
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  AccordionActions,
  Typography,
  SvgIcon,
} from '@material-ui/core';
import { BiChevronRight } from 'react-icons/bi';

import { CommonAccordionProps, CommonFormProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useFormStatus } from 'hooks/form';
import { useElementId } from 'hooks/helper';

type Props = CommonAccordionProps & {
  /** The form component */
  Form: React.FC<CommonFormProps>;
};

/** Renders an expandable form which fits into an accordion layout. */
export const AccordionForm: React.FC<Props> = ({
  title,
  preview,
  Form,
  expanded,
  toggle,
  disabled,
}) => {
  const { t } = useTranslation();
  const formId = useElementId('form');
  const { enqueueSnackbar } = useSnackbar();
  const { formStatus, setFormStatus } = useFormStatus(() => {
    toggle();
    enqueueSnackbar(t('notice.changesSaved'));
  });

  return (
    <Accordion
      expanded={expanded}
      onChange={toggle}
      TransitionProps={{ unmountOnExit: true }}
      disabled={disabled}
    >
      <AccordionSummary
        expandIcon={<SvgIcon component={BiChevronRight} />}
        aria-label={t('action.edit')}
      >
        <Typography component="h2" variant="subtitle2">
          {title}
        </Typography>

        {!expanded && (
          <Typography component="p" variant="body2" color="textSecondary">
            {preview}
          </Typography>
        )}
      </AccordionSummary>

      <AccordionDetails>
        <Form mode="onSubmit" setStatus={setFormStatus} id={formId} />
      </AccordionDetails>

      <Divider />

      <AccordionActions>
        <Button
          size="small"
          color="primary"
          onClick={toggle}
          disabled={formStatus === 'submitting'}
        >
          {t('action.cancel')}
        </Button>

        <Button
          type="submit"
          variant="contained"
          size="small"
          color="primary"
          form={formId}
          disabled={formStatus === 'submitting'}
        >
          {t('action.save')}
        </Button>
      </AccordionActions>
    </Accordion>
  );
};
