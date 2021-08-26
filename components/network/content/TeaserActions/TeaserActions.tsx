import NextLink from 'next/link';
import { Box, Button, Grid } from '@material-ui/core';

import { getEntityPath } from 'util/url';
import { useColumnQuery } from 'hooks/layout';
import { ContentReactions } from 'components/network/content';

type Props = {
  /** The content ID */
  id: string;
  /** The primary call-to-action */
  buttonText: string;
  /** The number of supports */
  supportCount?: number;
  /** The number of comments */
  commentCount?: number;
  /** Custom styles */
  className?: string;
};

/**
 * Renders action buttons to interact with content elements. Meant to be used
 * within teaser components. The component is layout sensitive and wraps its
 * content when there is little space.
 */
export const TeaserActions: React.FC<Props> = ({
  id,
  supportCount,
  commentCount,
  buttonText,
  className,
}) => {
  const shouldNotWrap = useColumnQuery(480);

  return (
    <Box className={className}>
      <Grid container justify="space-between" spacing={2}>
        <Grid item xs={shouldNotWrap ? 6 : 12}>
          <NextLink href={getEntityPath(id)} passHref>
            <Button color="inherit" variant="outlined">
              {buttonText}
            </Button>
          </NextLink>
        </Grid>

        {supportCount != null && commentCount != null && (
          <Grid item>
            <Box ml={-0.5} mr={-1}>
              <ContentReactions
                id={id}
                supportCount={supportCount}
                commentCount={commentCount}
              />
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
