import { Box, Button, Typography } from '@material-ui/core';

import { EXTERNAL_LINK_PROPS, LEARN_MORE_URL } from 'lib/constants';
import { useTranslation } from 'lib/i18n';

type Props = {
  /** Use smaller text */
  condensed?: boolean;
};

/**
 * Renders tiny introduction with a link to additional explanations on the
 * support platform.
 */
export const WelcomeText: React.FC<Props> = ({ condensed }) => {
  const { t } = useTranslation();

  return (
    <>
      <Typography component="p" variant="subtitle2">
        {t('label.welcome')}
      </Typography>

      <Typography component="p" variant={condensed ? 'caption' : 'body2'}>
        {t('meta.description')}
      </Typography>

      <Box ml={-1}>
        <Button color="primary" href={LEARN_MORE_URL} {...EXTERNAL_LINK_PROPS}>
          {t('action.learnMore')}
        </Button>
      </Box>
    </>
  );
};
