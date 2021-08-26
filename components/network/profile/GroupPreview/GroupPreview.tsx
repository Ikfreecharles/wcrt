import NextLink from 'next/link';
import { Box, Card, CardActionArea, Typography } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import { GroupPreviewFragment } from 'lib/graphql';
import { getGroupMemberAvatars } from 'util/data';
import { InlineAvatarList } from 'components/network/profile';
import { getEntityPath } from 'util/url';

type Props = {
  /** Raw GraphQL data */
  data: GroupPreviewFragment;
};

/**
 * Renders a minimal group preview with some meta data and the intro text. Meant
 * to be used as call to action for interested parties.
 */
export const GroupPreview: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <NextLink href={getEntityPath(data.id)} passHref>
        <CardActionArea>
          <Box p={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mb={1.5}
            >
              <Typography variant="h5">{data.name}</Typography>

              <Typography variant="button" color="primary">
                {t('action.participate')}
              </Typography>
            </Box>

            <Typography variant="body2" paragraph>
              {data.intro}
            </Typography>

            <InlineAvatarList
              background="paper"
              items={getGroupMemberAvatars(data.administeredBy)}
            />
          </Box>
        </CardActionArea>
      </NextLink>
    </Card>
  );
};
