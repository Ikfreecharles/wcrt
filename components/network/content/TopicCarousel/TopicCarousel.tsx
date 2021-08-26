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
import { Image } from 'components/common/media';
import { Avatar } from 'components/network/profile';

type Props = {
  /** A list of topic teaser data */
  topics: TopicTeaserFragment[];
};

const useStyles = makeStyles(({ spacing, palette, shadows }) => ({
  root: {
    margin: spacing(-2, 0, -2, -2),
    padding: spacing(2, 0),
    overflowX: 'auto',
    maskImage: `linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) ${spacing(
      2
    )}px calc(100% - ${spacing(10)}px), rgba(0, 0, 0, 0))`,
  },
  carouselWrapper: {
    display: 'flex',
    paddingLeft: spacing(2),
  },
  carouselItem: {
    flexShrink: 0,
    '&:not(:first-child)': {
      paddingLeft: spacing(2),
    },
    '&:last-child': {
      paddingRight: spacing(10),
    },
  },
  card: {
    boxShadow: shadows[2],
    '&:hover': {
      boxShadow: shadows[4],
    },
  },
  cardInner: {
    position: 'relative',
    display: 'block',
    width: spacing(20),
    height: spacing(25),
    padding: spacing(2),
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
  },
  cardBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  text: {
    position: 'relative',
    maxHeight: spacing(4 * 3),
    overflow: 'hidden',
    // Progressive enhancement to truncate after the fourth line.
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 4,
  },
  avatar: {
    position: 'absolute',
    left: spacing(2),
    bottom: spacing(2),
  },
}));

/**
 * Renders multiple topic previews side-by-side. The resulting horizontal view
 * is overflowing in a seamless manner and can be scrolled in both directions.
 */
export const TopicCarousel: React.FC<Props> = ({ topics }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.carouselWrapper}>
        {topics.map((topic) => {
          const author = topic.createdByGroup || topic.createdByPerson;

          return (
            <Box className={classes.carouselItem} key={topic.id}>
              <Card className={classes.card}>
                <NextLink href={getEntityPath(topic.id)} passHref>
                  <CardActionArea className={classes.cardInner}>
                    {topic.imagedBy.edges.length > 0 && (
                      <Image
                        file={topic.imagedBy.edges[0].node}
                        alt={t('content.image', {
                          type: t('content.type.topic'),
                        })}
                        backgroundBlend
                        resize="contentPreview"
                        className={classes.cardBackground}
                      />
                    )}

                    <Typography
                      component="h3"
                      variant="h6"
                      className={classes.text}
                    >
                      {topic.title}
                    </Typography>

                    {author && (
                      <Avatar data={author} className={classes.avatar} />
                    )}
                  </CardActionArea>
                </NextLink>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
