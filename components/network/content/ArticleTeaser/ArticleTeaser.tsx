import NextLink from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  makeStyles,
} from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import { ArticleTeaserFragment } from 'lib/graphql';
import { getEntityPath } from 'util/url';
import { excerpt } from 'util/text';
import { ContentHeader, TeaserActions } from 'components/network/content';
import { Signature } from 'components/network/profile';
import { Image } from 'components/common/media';

type Props = {
  /** Raw GraphQL data */
  data: ArticleTeaserFragment;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    padding: spacing(2, 3, 3),
  },
  gutterBottom: {
    marginBottom: spacing(2),
  },
  header: {
    position: 'relative',
    zIndex: 1,
    marginBottom: spacing(2),
  },
  actionContainer: {
    margin: spacing(-9, -3, 3),
  },
  actionArea: {
    padding: spacing(8, 3, 1),
  },
  image: {
    margin: spacing(2, -3),
    color: palette.primary.main,
  },
  teaserActions: {
    color: palette.primary.main,
  },
}));

/**
 * Renders an article teaser with some meta data and interaction metrics. Meant
 * to be used within a feed.
 */
export const ArticleTeaser: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const author = data.createdByGroup || data.createdByPerson;
  const teaserImage = data.imagedBy.edges.map((item) => item.node)[0];

  return (
    <Card component="article" className={classes.root}>
      <ContentHeader
        id={data.id}
        label={t('content.type.article')}
        timestamp={data.createdAt}
        className={classes.header}
      />

      <Box className={classes.actionContainer}>
        <NextLink href={getEntityPath(data.id)}>
          <CardActionArea component="div" className={classes.actionArea}>
            <Typography
              component="h2"
              variant="h4"
              className={classes.gutterBottom}
            >
              {data.title}
            </Typography>

            {teaserImage && (
              <Image
                file={teaserImage}
                alt={t('content.image', { type: t('content.type.article') })}
                aspectRatio={16 / 9}
                className={classes.image}
              />
            )}

            {author && (
              <Signature data={author} className={classes.gutterBottom} />
            )}

            {data.intro && (
              <Typography component="p" variant="body2">
                {excerpt(data.intro)}
              </Typography>
            )}
          </CardActionArea>
        </NextLink>
      </Box>

      <TeaserActions
        id={data.id}
        supportCount={data.ratingStats.count}
        commentCount={data.commentStats.count}
        buttonText={t('action.readMore')}
        className={classes.teaserActions}
      />
    </Card>
  );
};
