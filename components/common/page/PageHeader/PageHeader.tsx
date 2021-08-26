import NextLink from 'next/link';
import { Box, Typography, useTheme } from '@material-ui/core';
import { BiArrowBack } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { IconButton } from 'components/common/control';

type Props = {
  /** The page title */
  title: string;
  /** An additional explanation text */
  caption?: string;
  /** A link to show as back arrow */
  parentUrl?: string;
};

/**
 * Renders an uniform page intro section with a heading, a caption text and an
 * optional back link.
 */
export const PageHeader: React.FC<Props> = ({ title, caption, parentUrl }) => {
  const { t } = useTranslation();
  const { spacing } = useTheme();

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        minHeight={caption ? spacing(6) : spacing(7)}
        pb={caption ? 0 : 1}
      >
        {parentUrl && (
          <Box mr={0.5}>
            <NextLink href={parentUrl} passHref>
              <IconButton
                title={t('action.back')}
                icon={BiArrowBack}
                edge="start"
              />
            </NextLink>
          </Box>
        )}

        <Typography component="h1" variant="h5">
          {title}
        </Typography>
      </Box>

      {caption && (
        <Typography variant="body2" paragraph>
          {caption}
        </Typography>
      )}
    </>
  );
};
