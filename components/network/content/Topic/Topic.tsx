import { Box, Typography, Card, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { useTranslation } from 'lib/i18n';
import { TopicFragment } from 'lib/graphql';
import { useColumnQuery } from 'hooks/layout';
import {
  ContentSummaryList,
  ContentHeader,
  ContentFooter,
} from 'components/network/content';
import { ImageSlider, TextFormatter } from 'components/common/media';

type Props = {
  /** Raw GraphQL data */
  data: TopicFragment;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    backgroundColor: palette.primary.main,
    color: palette.primary.contrastText,
  },
  inner: {
    backgroundColor: palette.background.paper,
    color: palette.text.primary,
  },
  gutterBottom: {
    marginBottom: spacing(3),
  },
  classification: {
    marginTop: spacing(3),
  },
}));

/**
 * Renders a full topic view with all of the content’s meta data and a list of
 * curated contents. Meant to be used on the topic page.
 */
export const Topic: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const isExtended = useColumnQuery('sm');
  const classes = useStyles();

  const images = data.imagedBy.edges.map((item) => item.node);
  const contents = data.curates.edges.map((item) => item.node);
  const categories = data.categorizedBy.edges.map((item) => item.node.name);

  return (
    <Box component="article">
      <Card className={classes.card}>
        {images.length > 0 && (
          <ImageSlider
            files={images}
            alt={t('content.image', { type: t('content.type.topic') })}
            aspectRatio={16 / 9}
          />
        )}

        <Box component="header" px={3} pt={2} pb={3}>
          <ContentHeader
            id={data.id}
            label={t('content.type.topic')}
            timestamp={data.updatedAt}
            timestampFormat="relativeUpdateDate"
            className={classes.gutterBottom}
            invert
          />

          <Typography
            component="h1"
            variant="h2"
            className={clsx(data.intro && classes.gutterBottom)}
          >
            {data.title}
          </Typography>

          {data.intro && (
            <Typography variant="body1">
              <TextFormatter>{data.intro}</TextFormatter>
            </Typography>
          )}
        </Box>

        <Box py={3} className={classes.inner}>
          <ContentSummaryList
            contents={contents}
            indent={3}
            extended={isExtended}
          />
        </Box>
      </Card>

      <ContentFooter
        id={data.id}
        categories={categories}
        location={data.locatedByAddress}
        className={classes.classification}
      />
    </Box>
  );
};
