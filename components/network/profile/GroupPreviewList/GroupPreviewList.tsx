import { Box, Grid, Button, makeStyles, fade } from '@material-ui/core';
import lowerFirst from 'lodash/lowerFirst';

import { CommonPaginationProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { GroupPreviewFragment } from 'lib/graphql';
import { GroupPreview } from 'components/network/profile';

type Props = {
  /** A descending sorted list of group data */
  groups: GroupPreviewFragment[];
  /** Pagination state and functionality */
  pagination?: CommonPaginationProps;
  /** Custom styles */
  className?: string;
};

const useStyles = makeStyles(({ palette }) => ({
  list: {
    listStyle: 'none',
    padding: 0,
  },
  fetchMoreButton: {
    backgroundColor: fade(palette.primary.main, palette.action.selectedOpacity),
  },
}));

/**
 * Renders multiple group previews in a stream with an optional pagination. The
 * latest group will be rendered at the bottom while the list is truncated at the top.
 */
export const GroupPreviewList: React.FC<Props> = ({
  groups,
  pagination,
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
                type: lowerFirst(t('label.groups')),
              })}
            </Button>
          </Grid>
        )}

        {[...groups].reverse().map((group) => (
          <Grid item xs={12} component="li" key={group.id}>
            <GroupPreview data={group} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
