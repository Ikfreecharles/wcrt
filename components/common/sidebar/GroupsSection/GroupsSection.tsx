import { Box, Grid, Card } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import { GroupTeaserFragment } from 'lib/graphql';
import { SidebarSection } from 'components/common/sidebar';
import { GroupTeaser } from 'components/network/profile';

type Props = {
  /** A list of group data */
  items: GroupTeaserFragment[];
};

/** Renders a list of group teasers. Meant to be used within a sidebar. */
export const GroupsSection: React.FC<Props> = ({ items }) => {
  const { t } = useTranslation();

  return (
    <SidebarSection title={t('label.groups')}>
      {items.length ? (
        <Grid container spacing={2}>
          {items.map((item) => (
            <Grid item xs={12} key={item.id}>
              <GroupTeaser data={item} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Card variant="outlined">
          <Box px={1} py={1.125} textAlign="center" color="text.disabled">
            {t('empty.groups')}
          </Box>
        </Card>
      )}
    </SidebarSection>
  );
};
