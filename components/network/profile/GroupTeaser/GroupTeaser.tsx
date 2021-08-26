import NextLink from 'next/link';
import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { BiHash, BiMap } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { GroupTeaserFragment } from 'lib/graphql';
import { useColumnQuery } from 'hooks/layout';
import { getGroupMemberAvatars } from 'util/data';
import { excerpt } from 'util/text';
import { getEntityPath } from 'util/url';
import { Avatar, InlineAvatarList } from 'components/network/profile';
import { IconWrapper } from 'components/common/misc';

type Props = {
  /** Raw GraphQL data */
  data: GroupTeaserFragment;
};

const useStyles = makeStyles(({ mixins }) => ({
  truncateText: {
    ...mixins.truncateText,
  },
}));

/**
 * Renders an group teaser with some meta data. The component is layout
 * sensitive and hides some elements when there is little space. Meant to be
 * used within a feed of public.
 */
export const GroupTeaser: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const showExtraElements = useColumnQuery('sm');
  const classes = useStyles();

  return (
    <Card component="article">
      <NextLink href={getEntityPath(data.id)} passHref>
        <CardActionArea>
          <Box p={2}>
            <Box display="flex">
              <Box flex="1" minWidth={0}>
                <Typography
                  component="h2"
                  variant="h5"
                  gutterBottom
                  className={classes.truncateText}
                >
                  {data.name}
                </Typography>

                {(data.categorizedBy || data.locatedByAddress) && (
                  <Box color="text.secondary" mb={1.5}>
                    <Grid container spacing={2}>
                      {data.categorizedBy && (
                        <Grid item>
                          <IconWrapper
                            icon={BiHash}
                            title={t('label.category')}
                          >
                            <Typography variant="body2">
                              {t(
                                `content.category.${data.categorizedBy?.name}`
                              )}
                            </Typography>
                          </IconWrapper>
                        </Grid>
                      )}

                      {data.locatedByAddress && (
                        <Grid item>
                          <IconWrapper icon={BiMap} title={t('label.location')}>
                            <Typography variant="body2">
                              {data.locatedByAddress.addressLocality}
                            </Typography>
                          </IconWrapper>
                        </Grid>
                      )}
                    </Grid>
                  </Box>
                )}

                <InlineAvatarList
                  background="paper"
                  items={getGroupMemberAvatars(data.administeredBy)}
                />
              </Box>

              {showExtraElements && data.imagedBy && (
                <Box ml={1}>
                  <Avatar size="large" data={data} />
                </Box>
              )}
            </Box>

            {showExtraElements && data.intro && (
              <Box mt={1.5}>
                <Typography variant="body2">{excerpt(data.intro)}</Typography>
              </Box>
            )}
          </Box>
        </CardActionArea>
      </NextLink>
    </Card>
  );
};
