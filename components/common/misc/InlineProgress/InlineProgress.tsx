import { Box, CircularProgress } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';

/**
 * Renders a circular progress indicator meant to be used right within the
 * relevant layout position.
 */
export const InlineProgress: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
      p={4}
    >
      <CircularProgress aria-label={t('label.loadingContent')} />
    </Box>
  );
};
