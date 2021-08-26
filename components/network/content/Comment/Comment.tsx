import { Box, Card, Typography } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import { CommentFragment } from 'lib/graphql';
import { ConditionalWrapper } from 'components/common/misc';
import { Signature } from 'components/network/profile';

type Props = {
  /** Raw GraphQL data */
  data: CommentFragment;
  /** Elevate the comment and display its content more prominent */
  emphasized?: boolean;
};

/** Renders a single comment with some meta data. Meant to be used within a comment list. */
export const Comment: React.FC<Props> = ({ data, emphasized }) => {
  const { t } = useTranslation();

  return (
    <ConditionalWrapper
      condition={!!emphasized}
      wrap={(children) => <Card>{children}</Card>}
    >
      <Box p={emphasized ? 2 : undefined} role="comment">
        {emphasized && (
          <Box mb={2}>
            <Typography variant="body1">{data.text}</Typography>
          </Box>
        )}

        {/** @todo Remove additional check when mandatory fields are fixed. */}
        {data.createdBy && (
          <Signature
            data={data.createdBy}
            caption={t('format.relativePastDate', { date: data.createdAt })}
          />
        )}

        {!emphasized && (
          <Box mt={1}>
            <Typography variant="body2">{data.text}</Typography>
          </Box>
        )}
      </Box>
    </ConditionalWrapper>
  );
};
