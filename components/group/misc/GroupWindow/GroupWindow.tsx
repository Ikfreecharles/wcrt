import { useContext, useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import {
  AppBar,
  Box,
  Card,
  makeStyles,
  SwipeableDrawer,
  Theme,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { BiArrowBack, BiMenu, BiX } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { GroupContext } from 'context/group';
import { useRelativeNavigation } from 'hooks/navigation';
import { getInternalPath } from 'util/url';
import { GroupNavigation } from 'components/group/misc';
import { IconButton } from 'components/common/control';

type Props = {
  title: string;
  footer?: React.ReactNode;
  bottomGutter?: number;
  noPadding?: boolean;
};

const useStyles = makeStyles(
  ({ spacing, palette, breakpoints, zIndex, mixins }) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: `calc(100vh - ${spacing(8)}px)`,
      overflow: 'hidden',
      [breakpoints.down('sm')]: {
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: zIndex.appBar + 1,
        width: '100%',
        height: '100%',
        backgroundColor: palette.background.paper,
        borderRadius: 0,
      },
    },
    header: {
      [breakpoints.up('md')]: {
        borderTopLeftRadius: spacing(0.5),
        borderTopRightRadius: spacing(0.5),
      },
    },
    title: {
      ...mixins.truncateText,
    },
    content: {
      flex: '1',
      overflowY: 'auto',
    },
  })
);

/**
 * Renders the group window as layout wrapper for group tools and provides the
 * group navigation for the mobile layout. Meant to be used as wrapper for
 * internal group views.
 */
export const GroupWindow: React.FC<Props> = ({
  title,
  footer,
  bottomGutter = 0,
  noPadding,
  children,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const { groupId, groupName } = useContext(GroupContext);
  const { isDeeplyNested, navigateBack } = useRelativeNavigation(
    getInternalPath(groupId)
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery<Theme>(({ breakpoints }) =>
    breakpoints.up('md')
  );
  const classes = useStyles();

  const handleMenuOpen = () => setMenuOpen(true);
  const handleMenuClose = () => setMenuOpen(false);

  useEffect(() => {
    router.events.on('routeChangeComplete', handleMenuClose);

    return () => {
      router.events.off('routeChangeComplete', handleMenuClose);
    };
  }, [router]);

  return (
    <>
      <NextSeo title={`${title} | ${groupName}`} />

      <Card className={classes.root}>
        <AppBar position="static" className={classes.header}>
          <Toolbar>
            {(isDeeplyNested || !isDesktop) && (
              <IconButton
                title={t('action.back')}
                icon={BiArrowBack}
                color="inherit"
                edge="start"
                onClick={navigateBack}
              />
            )}

            <Box flex="1" mx={1} className={classes.title}>
              <Typography variant="h6">
                {router.asPath === getInternalPath(groupId) ? groupName : title}
              </Typography>
            </Box>

            {isDesktop ? (
              <NextLink href="/groups" passHref>
                <IconButton
                  title={t('action.close')}
                  icon={BiX}
                  color="inherit"
                  edge="end"
                />
              </NextLink>
            ) : (
              <>
                <IconButton
                  title={t('group:label.groupTools')}
                  icon={BiMenu}
                  color="inherit"
                  edge="end"
                  onClick={handleMenuOpen}
                />

                <SwipeableDrawer
                  anchor="right"
                  open={menuOpen}
                  onOpen={handleMenuOpen}
                  onClose={handleMenuClose}
                  disableDiscovery
                  PaperProps={{
                    role: 'dialog',
                    'aria-label': t('group:label.groupTools'),
                  }}
                >
                  <GroupNavigation groupId={groupId} />
                </SwipeableDrawer>
              </>
            )}
          </Toolbar>
        </AppBar>

        <Box p={noPadding ? 0 : 2} pb={0} className={classes.content}>
          {children}
          <Box pt={noPadding ? bottomGutter : 2 + bottomGutter} />
        </Box>

        {footer}
      </Card>
    </>
  );
};
