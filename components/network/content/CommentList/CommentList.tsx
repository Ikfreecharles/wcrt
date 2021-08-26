import {
  Box,
  Grid,
  Divider,
  Button,
  makeStyles,
  fade,
} from '@material-ui/core';
import lowerFirst from 'lodash/lowerFirst';

import { CommonPaginationProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { CommentFragment } from 'lib/graphql';
import { Comment } from 'components/network/content';

type Props = {
  /** A descending sorted list of comment data */
  comments: CommentFragment[];
  /** Pagination state and functionality */
  pagination?: CommonPaginationProps;
  /** Render elevated comments */
  emphasized?: boolean;
  /** Custom styles */
  className?: string;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  list: {
    listStyle: 'none',
    padding: 0,
  },
  divider: {
    marginTop: spacing(2),
  },
  fetchMoreButton: {
    backgroundColor: fade(palette.primary.main, palette.action.selectedOpacity),
  },
}));

/**
 * Renders multiple comments in a stream with an optional pagination. The latest
 * comment will be rendered at the bottom while the list is truncated at the top.
 */
export const CommentList: React.FC<Props> = ({
  comments,
  pagination,
  emphasized,
  className,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box className={className}>
      <Grid container component="ol" spacing={2} className={classes.list}>
        {pagination && pagination.hasMore && (
          <Grid item xs={12}>
            <Button
              color="primary"
              size="small"
              fullWidth
              onClick={pagination.fetchMore}
              disabled={pagination.loading}
              className={classes.fetchMoreButton}
            >
              {t('action.showPrevious', {
                type: lowerFirst(t('label.replies')),
              })}
            </Button>
          </Grid>
        )}

        {[...comments].reverse().map((comment, index) => (
          <Grid item xs={12} component="li" key={comment.id}>
            <Comment data={comment} emphasized={emphasized} />

            {!emphasized && index + 1 < comments.length && (
              <Divider className={classes.divider} />
            )}
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
