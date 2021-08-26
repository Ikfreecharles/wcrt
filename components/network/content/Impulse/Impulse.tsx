import { useState } from 'react';
import { Box, Typography, Card, Grid, makeStyles } from '@material-ui/core';
import { BiMessage, BiGroup } from 'react-icons/bi';
import clsx from 'clsx';

import { CommonPaginationProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { signIn } from 'lib/auth';
import { ImpulseFragment } from 'lib/graphql';
import { useProfile } from 'hooks/profile';
import { CommentList } from 'components/network/content';
import { ContentHeader, ContentFooter } from 'components/network/content';
import { ImageSlider, TextFormatter } from 'components/common/media';
import { ActionDisplay, TextDivider } from 'components/common/misc';
import { CommentDialog, GroupCreateDialog } from 'components/common/dialog';
import { GroupPreviewList } from 'components/network/profile';

type Props = {
  /** Raw GraphQL data */
  data: ImpulseFragment;
  /** Pagination for the impulse comments */
  commentPagination?: CommonPaginationProps;
  /** Pagination for the impulse group foundations */
  groupPagination?: CommonPaginationProps;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  card: {
    padding: spacing(2, 3, 0),
  },
  gutterBottom: {
    marginBottom: spacing(3),
  },
  image: {
    margin: spacing(0, -3),
    color: palette.primary.main,
  },
}));

/**
 * Renders a full impulse view with all of the content’s meta data and the
 * replies. Meant to be used on the impulse page.
 */
export const Impulse: React.FC<Props> = ({
  data,
  commentPagination,
  groupPagination,
}) => {
  const { t } = useTranslation();
  const viewerProfile = useProfile();
  const [replying, setReplying] = useState(false);
  const [founding, setFounding] = useState(false);
  const classes = useStyles();

  const images = data.imagedBy.edges.map((item) => item.node);
  const categories = data.categorizedBy.edges.map((item) => item.node.name);
  const comments = data.commentedBy.edges.map((item) => item.node);
  const relatedGroups = data.coveredBy.edges.map((item) => item.node);

  const handleReplyClick = () => (viewerProfile ? setReplying(true) : signIn());
  const handleFoundClick = () => (viewerProfile ? setFounding(true) : signIn());

  return (
    <Box component="article">
      <Card className={clsx(classes.card, classes.gutterBottom)}>
        <Box component="header" className={classes.gutterBottom}>
          <ContentHeader
            id={data.id}
            label={t('content.type.impulse')}
            timestamp={data.createdAt}
            className={classes.gutterBottom}
          />

          <Typography component="h1" variant="h1">
            {data.title}
          </Typography>
        </Box>

        {data.intro && (
          <Typography
            component="p"
            variant="body1"
            className={classes.gutterBottom}
          >
            <TextFormatter autoLink>{data.intro}</TextFormatter>
          </Typography>
        )}

        {images.length > 0 && (
          <ImageSlider
            files={images}
            alt={t('content.image', { type: t('content.type.impulse') })}
            aspectRatio={16 / 9}
            className={classes.image}
          />
        )}
      </Card>

      <ContentFooter
        id={data.id}
        categories={categories}
        location={data.locatedByAddress}
        editable={!!data._permissions?.update}
        className={classes.gutterBottom}
      />

      {relatedGroups.length > 0 && comments.length > 0 && (
        <TextDivider
          label={t('label.groupFoundations')}
          count={relatedGroups.length}
        />
      )}

      <GroupPreviewList
        groups={relatedGroups}
        pagination={groupPagination}
        className={classes.gutterBottom}
      />

      {relatedGroups.length > 0 && comments.length > 0 && (
        <TextDivider
          label={t('label.replies')}
          count={data.commentedBy.count}
        />
      )}

      <CommentList
        emphasized
        comments={comments}
        pagination={commentPagination}
        className={classes.gutterBottom}
      />

      <Grid container spacing={2} alignItems="stretch">
        <Grid item container xs={12} md={6}>
          <ActionDisplay
            icon={BiMessage}
            text={t('explain.impulse.action.reply')}
            buttonLabel={t('action.reply')}
            buttonOnClick={handleReplyClick}
          />

          <CommentDialog
            contentId={data.id}
            open={replying}
            setOpen={setReplying}
          />
        </Grid>

        <Grid item container xs={12} md={6}>
          <ActionDisplay
            icon={BiGroup}
            text={t('explain.impulse.action.group')}
            buttonLabel={t('action.implementIdea')}
            buttonOnClick={handleFoundClick}
          />

          <GroupCreateDialog
            relatedImpulse={{
              id: data.id,
              categorizedBy: data.categorizedBy,
              locatedByAddress: data.locatedByAddress,
            }}
            open={founding}
            setOpen={setFounding}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
