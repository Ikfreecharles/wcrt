import NextLink from 'next/link';
import {
  Box,
  Card,
  CardActionArea,
  makeStyles,
  Tooltip,
  Typography,
} from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import { GroupTeaserFragment } from 'lib/graphql';
import { useMessagingCount } from 'hooks/messaging';
import { getInternalPath } from 'util/url';
import { Signature } from 'components/network/profile';

type Props = {
  /** Raw GraphQL data */
  data: GroupTeaserFragment;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing(2),
  },
  activityBadge: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: spacing(3),
    height: spacing(3),
    marginLeft: spacing(2),
    padding: spacing(0, 0.5),
    borderRadius: spacing(1.5),
    backgroundColor: palette.secondary.main,
    color: palette.secondary.contrastText,
  },
}));

/**
 * Renders a teaser for the internal group view with some meta data and an
 * activity indicator. Meant to be used within a feed of my own groups.
 */
export const InternalGroupTeaser: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation();
  const unreadCount = data.chatChannel
    ? useMessagingCount(data.chatChannel)
    : 0;
  const classes = useStyles();

  return (
    <Card component="article">
      <NextLink href={getInternalPath(data.id)} passHref>
        <CardActionArea>
          <Box className={classes.content}>
            <Signature
              data={data}
              caption={t('count.member', { count: data.administeredBy.count })}
              link={false}
            />

            {unreadCount > 0 && (
              <Tooltip title={t('label.newActivity')!}>
                <Box className={classes.activityBadge}>
                  <Typography variant="subtitle2">{unreadCount}</Typography>
                </Box>
              </Tooltip>
            )}
          </Box>
        </CardActionArea>
      </NextLink>
    </Card>
  );
};
