import { Box, Typography, Grid, makeStyles } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import { ContentSummaryFragment } from 'lib/graphql';
import { useColumnQuery } from 'hooks/layout';
import { ContentReactions } from 'components/network/content';
import { Signature } from 'components/network/profile';
import { Image } from 'components/common/media';

type Props = {
  /** Raw GraphQL data */
  data: ContentSummaryFragment;
  /** Display an additional preview image */
  extended?: boolean;
};

type StyleProps = Pick<Props, 'extended'>;

const useStyles = makeStyles(({ spacing, palette, mixins }) => ({
  image: {
    width: spacing(16),
    marginRight: spacing(2.5),
    color: palette.primary.main,
  },
  text: {
    minWidth: 0,
  },
  title: ({ extended }: StyleProps) => ({
    marginBottom: spacing(0.5),
    ...(extended && mixins.truncateText),
  }),
  contentReactions: {
    color: palette.primary.main,
  },
}));

/**
 * Renders a preview of a content element in a compact manner and allows to
 * customize the sorting method. Meant to be used within a list.
 */
export const ContentSummary: React.FC<Props> = ({ data, extended }) => {
  const { t } = useTranslation();
  const shouldNotWrap = useColumnQuery(480);
  const classes = useStyles({ extended });

  const contentTypeKey = `content.type.${data.__typename?.toLowerCase()}`;
  const author = data.createdByGroup || data.createdByPerson;
  const teaserImage = data.imagedBy.edges.map((item) => item.node)[0];

  return (
    <Box component="article" display="flex">
      {extended && (
        <Image
          file={teaserImage}
          alt={t('content.image', { type: t(contentTypeKey) })}
          resize="contentPreview"
          aspectRatio={16 / 9}
          className={classes.image}
        />
      )}

      <Box flex="1" className={classes.text}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="overline" color="secondary">
            {t(contentTypeKey)}
          </Typography>

          <Typography variant="body2" color="textSecondary">
            {t('format.relativePastDate', { date: data.createdAt })}
          </Typography>
        </Box>

        <Typography component="h3" variant="body1" className={classes.title}>
          {data.title}
        </Typography>

        <Grid container justify="space-between" spacing={1}>
          <Grid item xs={shouldNotWrap ? 6 : 12}>
            {author && <Signature compact data={author} />}
          </Grid>

          <Grid item>
            <Box ml={-0.25} mr={-0.5} my={-0.375}>
              <ContentReactions
                id={data.id}
                supportCount={data.ratingStats.count}
                commentCount={data.commentStats.count}
                size="small"
                className={classes.contentReactions}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
