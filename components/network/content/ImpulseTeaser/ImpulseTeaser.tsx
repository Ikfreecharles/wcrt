import NextLink from 'next/link';
import {
  Box,
  Typography,
  Card,
  CardActionArea,
  makeStyles,
} from '@material-ui/core';
import { BiPulse } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { ImpulseTeaserFragment } from 'lib/graphql';
import { getEntityPath } from 'util/url';
import { ContentHeader, TeaserActions } from 'components/network/content';
import { IconWrapper } from 'components/common/misc';

type Props = {
  /** Raw GraphQL data */
  data: ImpulseTeaserFragment;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    padding: spacing(2, 3, 3),
  },
  gutterBottom: {
    marginBottom: spacing(2),
  },
  gutterBottomExtra: {
    marginBottom: spacing(5),
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
  teaserActions: {
    color: palette.primary.main,
  },
}));

/**
 * Renders an impulse teaser with some meta data and interaction metrics. Meant
 * to be used within a feed.
 */
export const ImpulseTeaser: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <Card component="article" className={classes.root}>
      <ContentHeader
        id={data.id}
        label={t('content.type.impulse')}
        timestamp={data.createdAt}
        className={classes.header}
      />

      <Box className={classes.actionContainer}>
        <NextLink href={getEntityPath(data.id)}>
          <CardActionArea component="div" className={classes.actionArea}>
            <Typography
              component="h2"
              variant="h1"
              className={classes.gutterBottom}
            >
              {data.title}
            </Typography>

            <IconWrapper
              icon={BiPulse}
              title={t('label.relevance')}
              size={4.5}
              color="secondary"
              className={classes.gutterBottomExtra}
            >
              <Typography component="p" variant="h3" color="secondary">
                {data.relevance}%
              </Typography>
            </IconWrapper>
          </CardActionArea>
        </NextLink>
      </Box>

      <TeaserActions
        id={data.id}
        supportCount={data.ratingStats.count}
        commentCount={data.commentStats.count}
        buttonText={t('action.view')}
        className={classes.teaserActions}
      />
    </Card>
  );
};
