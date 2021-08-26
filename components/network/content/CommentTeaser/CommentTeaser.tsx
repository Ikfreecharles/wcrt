import NextLink from 'next/link';
import { Box, Typography, Link, makeStyles, fade } from '@material-ui/core';
import lowerFirst from 'lodash/lowerFirst';

import { useTranslation } from 'lib/i18n';
import { CommentTeaserFragment } from 'lib/graphql';
import { Comment } from 'components/network/content';
import { getEntityPath } from 'util/url';

type Props = {
  /** Raw GraphQL data */
  data: CommentTeaserFragment;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    color: palette.secondary.dark,
    backgroundColor: fade(palette.secondary.main, 0.1),
    borderRadius: spacing(0.5),
  },
}));

/**
 * Renders a comment and a reference to its origin content. Meant to be used
 * within a feed.
 */
export const CommentTeaser: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Comment data={data} emphasized />

      {data.comments && (
        <Box px={2} py={1}>
          <Typography variant="body2">
            <NextLink href={getEntityPath(data.comments.id)} passHref>
              <Link color="inherit">
                {t(`content.type.${lowerFirst(data.comments.__typename)}`)}:{' '}
                {data.comments.title}
              </Link>
            </NextLink>
          </Typography>
        </Box>
      )}
    </Box>
  );
};
