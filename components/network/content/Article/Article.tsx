import { Box, Typography, Card, makeStyles } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import { ArticleFragment } from 'lib/graphql';
import { ContentHeader, ContentFooter } from 'components/network/content';
import { Signature } from 'components/network/profile';
import { Markdown, ImageSlider } from 'components/common/media';

type Props = {
  /** Raw GraphQL data */
  data: ArticleFragment;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    padding: spacing(2, 3, 3),
  },
  gutterBottom: {
    marginBottom: spacing(3),
  },
  image: {
    margin: spacing(0, -3, 3),
    color: palette.primary.main,
  },
  classification: {
    marginTop: spacing(3),
  },
}));

/**
 * Renders a full article view with all of the content’s meta data and a
 * Markdown body. Meant to be used on the article page.
 */
export const Article: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const author = data.createdByGroup || data.createdByPerson;
  const images = data.imagedBy.edges.map((item) => item.node);
  const categories = data.categorizedBy.edges.map((item) => item.node.name);

  return (
    <Box component="article">
      <Card className={classes.card}>
        <Box component="header">
          <ContentHeader
            id={data.id}
            label={t('content.type.article')}
            timestamp={data.createdAt}
            className={classes.gutterBottom}
          />

          <Typography
            component="h1"
            variant="h2"
            className={classes.gutterBottom}
          >
            {data.title}
          </Typography>

          {data.intro && (
            <Typography
              component="p"
              variant="body1"
              className={classes.gutterBottom}
            >
              {data.intro}
            </Typography>
          )}

          {author && (
            <Signature data={author} className={classes.gutterBottom} />
          )}
        </Box>

        {images.length > 0 && (
          <ImageSlider
            files={images}
            alt={t('content.image', { type: t('content.type.article') })}
            aspectRatio={16 / 9}
            className={classes.image}
          />
        )}

        <Markdown>{data.text}</Markdown>
      </Card>

      <ContentFooter
        id={data.id}
        categories={categories}
        location={data.locatedByAddress}
        editable={!!data._permissions?.update}
        className={classes.classification}
      />
    </Box>
  );
};
