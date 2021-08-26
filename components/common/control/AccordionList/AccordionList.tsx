import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  SvgIcon,
  Typography,
} from '@material-ui/core';
import { BiChevronRight } from 'react-icons/bi';

import { CommonAccordionProps } from 'types';
import { useTranslation } from 'lib/i18n';

type Props = CommonAccordionProps & {
  /** A description to show when expanded */
  description: string;
  /** The list component */
  List: React.FC;
};

/** Renders an expandable list which fits into an accordion layout. */
export const AccordionList: React.FC<Props> = ({
  title,
  preview,
  description,
  List,
  expanded,
  toggle,
}) => {
  const { t } = useTranslation();

  return (
    <Accordion
      expanded={expanded}
      onChange={toggle}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary
        expandIcon={<SvgIcon component={BiChevronRight} />}
        aria-label={t('action.view')}
      >
        <Typography component="h2" variant="subtitle2">
          {title}
        </Typography>

        <Typography component="p" variant="body2" color="textSecondary">
          {preview}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>{description}</AccordionDetails>

      <Divider />

      <List />
    </Accordion>
  );
};
