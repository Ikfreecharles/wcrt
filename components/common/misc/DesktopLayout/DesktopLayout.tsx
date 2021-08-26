import { ComponentProps, useState } from 'react';
import NextLink from 'next/link';
import { Box, Container, Grid, GridSize, makeStyles } from '@material-ui/core';

import { VideoMeeting } from 'types';
import { useSession } from 'lib/auth';
import { VideoMeetingProvider } from 'context/videoMeeting';
import {
  Layout,
  GridColumn,
  FixedColumn,
  Logo,
  WelcomeText,
} from 'components/common/misc';
import {
  DesktopNavigation,
  DesktopHeader,
  TabNavigation,
  Footer,
} from 'components/common/navigation';
import { CreateButton } from 'components/common/control';
import { PermanentVideoMeeting } from 'components/common/media';

type Props = ComponentProps<typeof Layout>;

const useStyles = makeStyles(() => ({
  container: {
    overflowX: 'hidden',
  },
  noVerticalGutter: {
    marginTop: '0 !important',
    marginBottom: '0 !important',
    paddingTop: '0 !important',
    paddingBottom: '0 !important',
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}));

/**
 * Renders the global layout for large screens. Includes a main column and two
 * fixed sidebars which can be separately scrolled. Takes care of video
 * meetings, so we can display them on a global level.
 */
export const DesktopLayout: React.FC<Props> = ({
  embedded,
  pageLayout,
  children,
}) => {
  const [session] = useSession();
  const [videoMeeting, setVideoMeeting] = useState<VideoMeeting | null>(null);
  const classes = useStyles();

  const containerWidth = 'lg';
  const columnSpacing = 4;
  const columnWidth: Record<'left' | 'main' | 'right', GridSize | undefined> = {
    left: !embedded ? 2 : undefined,
    main: !embedded ? 6 : 7,
    right: !embedded ? 4 : 5,
  };

  const handleMeetingEnd = () => setVideoMeeting(null);

  return (
    <VideoMeetingProvider
      value={{
        startVideoMeeting: setVideoMeeting,
        endVideoMeeting: handleMeetingEnd,
      }}
    >
      <Container maxWidth={containerWidth} className={classes.container}>
        <Grid
          container
          spacing={columnSpacing}
          className={classes.noVerticalGutter}
        >
          {!embedded && (
            <GridColumn
              md={columnWidth.left}
              className={classes.noVerticalGutter}
            >
              <FixedColumn
                component="header"
                containerWidth={containerWidth}
                spacing={columnSpacing}
                md={columnWidth.left}
              >
                <NextLink href="/" passHref>
                  <Box component="a" display="block">
                    <Logo />
                  </Box>
                </NextLink>

                <Box mt={4}>
                  <DesktopNavigation />
                </Box>

                <Box mt={2}>
                  <CreateButton extended />
                </Box>

                {videoMeeting && (
                  <Box mt={4}>
                    <PermanentVideoMeeting
                      title={videoMeeting.title}
                      room={videoMeeting.room}
                      onMeetingEnd={handleMeetingEnd}
                    />
                  </Box>
                )}

                {!session && (
                  <Box mt={4}>
                    <WelcomeText />
                  </Box>
                )}
              </FixedColumn>
            </GridColumn>
          )}

          <GridColumn
            md={columnWidth.main}
            className={classes.noVerticalGutter}
          >
            <Box component="main" py={columnSpacing} position="relative">
              {pageLayout?.tabNavigation && (
                <Box mb={2}>
                  <TabNavigation elevated {...pageLayout.tabNavigation} />
                </Box>
              )}

              {children}
            </Box>
          </GridColumn>

          <GridColumn
            md={columnWidth.right}
            className={classes.noVerticalGutter}
          >
            <FixedColumn
              component="aside"
              containerWidth={containerWidth}
              spacing={columnSpacing}
              md={columnWidth.right}
              className={classes.sidebar}
            >
              <Box mb={columnSpacing}>
                {!embedded && (
                  <Box mb={pageLayout?.sidebar ? columnSpacing : undefined}>
                    <DesktopHeader />
                  </Box>
                )}

                {pageLayout?.sidebar?.content}
              </Box>

              <Footer />
            </FixedColumn>
          </GridColumn>
        </Grid>
      </Container>
    </VideoMeetingProvider>
  );
};
