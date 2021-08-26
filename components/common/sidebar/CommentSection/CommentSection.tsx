import { Box, Card, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { CommonPaginationProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { CommentFragment } from 'lib/graphql';
import { useProfile } from 'hooks/profile';
import { useFormStatus } from 'hooks/form';
import { useElementId } from 'hooks/helper';
import { SidebarSection } from 'components/common/sidebar';
import { CommentList } from 'components/network/content';
import { CommentForm } from 'components/common/form';
import { Signature } from 'components/network/profile';

type Props = {
  /** The ID of the content entity */
  contentId: string;
  /** A list of comment data */
  comments: CommentFragment[];
  /** Pagination state and functionality */
  pagination?: CommonPaginationProps;
  /** The number of comments */
  count?: number;
};

/**
 * Renders the comments of a content entity and a form to add new comments.
 * Meant to be used within a sidebar.
 */
export const CommentSection: React.FC<Props> = ({
  contentId,
  comments,
  pagination,
  count,
}) => {
  const { t } = useTranslation();
  const formId = useElementId('form');
  const { enqueueSnackbar } = useSnackbar();
  const viewerProfile = useProfile();
  const { formStatus, setFormStatus } = useFormStatus(() => {
    enqueueSnackbar(t('notice.replyPublished'));
  });

  return (
    <SidebarSection title={t('label.replies')} count={count}>
      {comments.length ? (
        <CommentList comments={comments} pagination={pagination} />
      ) : (
        <Card variant="outlined">
          <Box p={1} textAlign="center" color="text.disabled">
            {t('empty.replies')}
          </Box>
        </Card>
      )}

      {viewerProfile && (
        <Box mt={2}>
          <CommentForm
            contentId={contentId}
            mode="onChange"
            setStatus={setFormStatus}
            id={formId}
          />

          <Box mt={2} display="flex" justifyContent="space-between">
            <Box flex="1" minWidth={0} mr={2}>
              {viewerProfile && <Signature data={viewerProfile} />}
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              form={formId}
              disabled={formStatus !== 'valid'}
            >
              {t('action.reply')}
            </Button>
          </Box>
        </Box>
      )}
    </SidebarSection>
  );
};
