import { ComponentProps, useState } from 'react';
import {
  useScrollTrigger,
  Box,
  Container,
  makeStyles,
} from '@material-ui/core';

import { calcMobileNavOffset } from 'util/layout';
import { Layout } from 'components/common/misc';
import {
  MobileHeader,
  MobileNavigation,
  TabNavigation,
  Footer,
} from 'components/common/navigation';
import { MobileCreateButton } from 'components/common/control';

type Props = ComponentProps<typeof Layout>;

const useStyles = makeStyles(({ spacing, zIndex }) => ({
  container: {
    overflowX: 'hidden',
    paddingTop: spacing(2),
    paddingBottom: calcMobileNavOffset(spacing(2)),
    fallbacks: {
      paddingBottom: calcMobileNavOffset(spacing(2), true),
    },
  },
  mobileFab: {
    position: 'fixed',
    zIndex: zIndex.appBar,
    left: '50%',
    bottom: calcMobileNavOffset(spacing(2)),
    transform: 'translateX(-50%)',
    fallbacks: {
      bottom: calcMobileNavOffset(spacing(2), true),
    },
  },
  mobileNav: {
    position: 'fixed',
    zIndex: zIndex.appBar,
    bottom: 0,
    width: '100%',
  },
}));

/**
 * Renders the global layout for small screens. Uses a vertical orientation
 * instead of different columns.
 */
export const MobileLayout: React.FC<Props> = ({
  embedded,
  pageLayout,
  children,
}) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const isScrolling = useScrollTrigger({ threshold: 0 });
  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: isScrolling ? headerHeight : 0,
  });
  const classes = useStyles();

  const sectionSpacing = 2;

  return (
    <>
      {!embedded && (
        <MobileHeader
          elevated={isScrolled}
          hidden={isScrolled && isScrolling}
          setHeight={setHeaderHeight}
        />
      )}

      <Container className={classes.container}>
        {pageLayout?.tabNavigation && (
          <Box mb={2}>
            <TabNavigation {...pageLayout.tabNavigation} />
          </Box>
        )}

        {pageLayout?.sidebar?.displayOnSmallScreens === 'pageStart' && (
          <Box component="aside" mb={sectionSpacing}>
            {pageLayout.sidebar.content}
          </Box>
        )}

        <Box
          component="main"
          position="relative"
          mb={
            pageLayout?.sidebar?.displayOnSmallScreens === 'pageEnd'
              ? sectionSpacing
              : sectionSpacing * 2
          }
        >
          {children}
        </Box>

        {pageLayout?.sidebar?.displayOnSmallScreens === 'pageEnd' && (
          <Box component="aside" mb={sectionSpacing * 2}>
            {pageLayout.sidebar.content}
          </Box>
        )}

        <Footer />
      </Container>

      {!embedded && <MobileCreateButton className={classes.mobileFab} />}
      {!embedded && <MobileNavigation className={classes.mobileNav} />}
    </>
  );
};
