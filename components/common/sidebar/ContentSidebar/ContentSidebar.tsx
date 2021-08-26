import { Box, Typography } from '@material-ui/core';
import { BiPulse } from 'react-icons/bi';

import { CommonPaginationProps } from 'types';
import { useTranslation } from 'lib/i18n';

import {
  AgentSignatureFragment,
  AgentAvatarFragment,
  CommentFragment,
  TopicTeaserFragment,
} from 'lib/graphql';
import {
  SidebarSection,
  SupportSection,
  CommentSection,
} from 'components/common/sidebar';
import { TopicCarousel } from 'components/network/content';
import { Signature } from 'components/network/profile';
import { IconWrapper } from 'components/common/misc';

type Props = {
  /** The ID of the content entity */
  id: string;
  /** The relevance of an impulse */
  relevance?: number;
  /** The author of an impulse */
  impulseAuthor?: AgentSignatureFragment;
  /** A list of supporter data */
  supporters?: AgentAvatarFragment[];
  /** The number of supporters */
  supportCount?: number;
  /** A list of comment data */
  comments?: CommentFragment[];
  /** The number of comments */
  commentCount?: number;
  /** Pagination for comments */
  commentPagination?: CommonPaginationProps;
  /** A list of related topic data */
  relatedTopics?: TopicTeaserFragment[];
};

/** Renders several sidebar sections meant to be used as sidebar for a content page. */
export const ContentSidebar: React.FC<Props> = ({
  id,
  relevance,
  impulseAuthor,
  supporters,
  supportCount,
  comments,
  commentCount,
  commentPagination,
  relatedTopics,
}) => {
  const { t } = useTranslation();

  return (
    <>
      {relevance && (
        <SidebarSection title={t('label.relevance')}>
          <Box mb={1}>
            <IconWrapper
              icon={BiPulse}
              title={t('label.relevance')}
              size={4.5}
              color="secondary"
            >
              <Typography component="p" variant="h3" color="secondary">
                {relevance}%
              </Typography>
            </IconWrapper>
          </Box>

          <Typography component="p" variant="body2">
            {t('explain.impulse.relevance')}
          </Typography>
        </SidebarSection>
      )}

      {impulseAuthor && (
        <SidebarSection title={t('label.impulseAuthor')}>
          <Signature data={impulseAuthor} />
        </SidebarSection>
      )}

      {supporters && (
        <SupportSection
          contentId={id}
          supporters={supporters}
          count={supportCount}
        />
      )}

      {comments && (
        <CommentSection
          contentId={id}
          comments={comments}
          pagination={commentPagination}
          count={commentCount}
        />
      )}

      {relatedTopics && relatedTopics.length > 0 && (
        <SidebarSection title={t('label.relatedTopics')}>
          <TopicCarousel topics={relatedTopics} />
        </SidebarSection>
      )}
    </>
  );
};
