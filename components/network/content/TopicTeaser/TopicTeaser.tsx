import NextLink from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  makeStyles,
} from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import { TopicTeaserFragment } from 'lib/graphql';
import { getEntityPath } from 'util/url';
import { ContentHeader, TeaserActions } from 'components/network/content';
import { Signature } from 'components/network/profile';
import { Image } from 'components/common/media';

type Props = {
  /** Raw GraphQL data */
  data: TopicTeaserFragment;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    position: 'relative',
    padding: spacing(2, 3, 3),
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
  },
  background: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  foreground: {
    position: 'relative',
  },
  gutterBottom: {
    marginBottom: spacing(2),
  },
  gutterBottomExtra: {
    marginBottom: spacing(10),
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
}));

/**
 * Renders a topic teaser with some meta data and interaction metrics. Meant to
 * be used within a feed.
 */
export const TopicTeaser: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const author = data.createdByGroup || data.createdByPerson;
  const teaserImage = data.imagedBy.edges.map((item) => item.node)[0];

  return (
    <Card component="article" className={classes.root}>
      {teaserImage && (
        <Image
          file={teaserImage}
          alt={t('content.image', { type: t('content.type.topic') })}
          backgroundBlend
          className={classes.background}
        />
      )}

      <Box className={classes.foreground}>
        <ContentHeader
          id={data.id}
          label={t('content.type.topic')}
          timestamp={data.updatedAt}
          timestampFormat="relativeUpdateDate"
          invert
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

              {author && (
                <Signature
                  invert
                  data={author}
                  className={classes.gutterBottomExtra}
                />
              )}
            </CardActionArea>
          </NextLink>
        </Box>

        <TeaserActions id={data.id} buttonText={t('action.learnMore')} />
      </Box>
    </Card>
  );
};
