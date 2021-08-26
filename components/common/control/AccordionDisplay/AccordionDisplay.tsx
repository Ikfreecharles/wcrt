import { Accordion, AccordionSummary, Typography } from '@material-ui/core';

import { CommonAccordionProps } from 'types';

type Props = Pick<CommonAccordionProps, 'title' | 'preview'>;

/** Renders a simple information panel which fits into an accordion layout. */
export const AccordionDisplay: React.FC<Props> = ({ title, preview }) => (
  <Accordion disabled>
    <AccordionSummary>
      <Typography component="h2" variant="subtitle2">
        {title}
      </Typography>

      <Typography component="p" variant="body2" color="textSecondary">
        {preview}
      </Typography>
    </AccordionSummary>
  </Accordion>
);
