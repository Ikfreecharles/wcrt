import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  SvgIcon,
} from '@material-ui/core';
import { BiLike, BiDislike } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { useSession } from 'lib/auth';
import { AgentAvatarFragment } from 'lib/graphql';
import { useContentState } from 'hooks/content';
import { useSupport } from 'hooks/support';
import { SidebarSection } from 'components/common/sidebar';
import { AvatarList } from 'components/network/profile';

type Props = {
  /** The ID of the content entity */
  contentId: string;
  /** A list of supporter data */
  supporters: AgentAvatarFragment[];
  /** The number of supporters */
  count?: number;
};

/**
 * Renders the supporters of a content entity and a button to toggle the support
 * state. Meant to be used within a sidebar.
 */
export const SupportSection: React.FC<Props> = ({
  contentId,
  supporters,
  count,
}) => {
  const { t } = useTranslation();
  const [session] = useSession();
  const { supported } = useContentState(contentId);
  const { toggleSupport, supportPending } = useSupport(contentId);

  const handleSupportClick = () => toggleSupport();

  return (
    <SidebarSection title={t('label.supporters')} count={count}>
      {supporters.length ? (
        <Box overflow="hidden">
          <AvatarList linked items={supporters} />
        </Box>
      ) : (
        <Card variant="outlined">
          <Box px={1} py={1.125} textAlign="center" color="text.disabled">
            {t('empty.supporters')}
          </Box>
        </Card>
      )}

      {session && (
        <Box overflow="hidden" mt={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item sm="auto">
              <Button
                variant="outlined"
                color="primary"
                startIcon={
                  <SvgIcon component={supported ? BiDislike : BiLike} />
                }
                onClick={handleSupportClick}
                disabled={supportPending}
              >
                {supported ? t('action.unsupport') : t('action.support')}
              </Button>
            </Grid>

            {!supported && (
              <Grid item sm>
                <Typography component="p" variant="caption">
                  {t('explain.support')}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Box>
      )}
    </SidebarSection>
  );
};
