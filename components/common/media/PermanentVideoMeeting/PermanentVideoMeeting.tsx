import { ComponentProps, useRef, useState } from 'react';
import {
  AppBar,
  Backdrop,
  Box,
  ButtonBase,
  makeStyles,
  Paper,
  Popper,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { BiMinus, BiWindows, BiXCircle } from 'react-icons/bi';
import PopperJs from 'popper.js';
import clsx from 'clsx';

import { useTranslation } from 'lib/i18n';
import { VideoMeeting } from 'components/common/media';
import { IconButton } from 'components/common/control';

type Props = ComponentProps<typeof VideoMeeting> & {
  room: string;
  title: string;
  onMeetingEnd: () => void;
};

const useStyles = makeStyles(({ spacing, zIndex, mixins }) => ({
  placeholder: {
    width: '100%',
    height: spacing(15 + 3.75),
  },
  popper: {
    zIndex: zIndex.modal,
  },
  minimizedPopper: {
    width: spacing(22.5),
  },
  maximizedPopper: {
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  screen: {
    overflow: 'hidden',
  },
  maximizedScreen: {
    display: 'flex',
    flexDirection: 'column',
    width: `calc(100% - ${spacing(8)}px)`,
    height: `calc(100% - ${spacing(8)}px)`,
    margin: spacing(4),
  },
  minimizedScreen: {
    width: spacing(22.5),
    height: spacing(14),
    marginBottom: spacing(1),
    cursor: 'pointer',
  },
  noPointerEvents: {
    pointerEvents: 'none',
  },
  caption: {
    marginRight: spacing(1),
    ...mixins.truncateText,
  },
  backdrop: {
    zIndex: 'auto',
  },
}));

/**
 * Renders a global video meeting dialog, which can be minimized while continue
 * browsing around. The current solution incorporates some cumbersome styling as
 * we need to make sure that the component does not re-render when it gets
 * minimized. Meant to be used within the desktop layout.
 */
export const PermanentVideoMeeting: React.FC<Props> = ({
  title,
  onMeetingEnd,
  ...props
}) => {
  const { t } = useTranslation();
  const placeholderEl = useRef<HTMLDivElement>(null);
  const popperRef = useRef<PopperJs | null>(null);
  const [minimized, setMinimized] = useState(false);
  const classes = useStyles();

  const dummyAnchorEl = {
    getBoundingClientRect: () => new DOMRect(),
    clientWidth: 0,
    clientHeight: 0,
  };

  const handleMinimizeClick = () => setMinimized(true);
  const handleMaximizeClick = () => setMinimized(false);
  const handleMeetingEndClick = () => onMeetingEnd();

  return (
    <>
      <Box className={classes.placeholder}>
        <span ref={placeholderEl} />
      </Box>

      <Popper
        open
        placement="bottom-start"
        anchorEl={minimized ? placeholderEl.current : dummyAnchorEl}
        modifiers={{
          hide: { enabled: false },
          flip: { enabled: false },
          preventOverflow: { enabled: false },
        }}
        popperRef={popperRef}
        className={clsx(
          classes.popper,
          minimized && classes.minimizedPopper,
          !minimized && classes.maximizedPopper
        )}
      >
        <Paper
          elevation={minimized ? 4 : 24}
          onClick={minimized ? handleMaximizeClick : undefined}
          className={clsx(
            classes.screen,
            minimized && classes.minimizedScreen,
            !minimized && classes.maximizedScreen
          )}
        >
          {!minimized && (
            <AppBar position="static">
              <Toolbar>
                <Box flex="1">
                  <Typography component="h2" variant="h6">
                    {title}
                  </Typography>
                </Box>

                <Box display="flex">
                  <IconButton
                    onClick={handleMinimizeClick}
                    title={t('action.minimize')}
                    icon={BiMinus}
                    color="inherit"
                  />

                  <IconButton
                    onClick={handleMeetingEndClick}
                    title={t('action.leaveMeeting')}
                    icon={BiXCircle}
                    color="inherit"
                    edge="end"
                  />
                </Box>
              </Toolbar>
            </AppBar>
          )}

          <Box
            flex={!minimized ? 1 : undefined}
            height={minimized ? '100%' : undefined}
            className={clsx(minimized && classes.noPointerEvents)}
          >
            <VideoMeeting {...props} />
          </Box>
        </Paper>

        <Backdrop open={!minimized} onClick={handleMinimizeClick} />

        {minimized && (
          <Box display="flex" justifyContent="space-between" width="100%">
            <ButtonBase
              onClick={handleMaximizeClick}
              className={classes.caption}
            >
              <Typography variant="body2" color="primary">
                {title}
              </Typography>
            </ButtonBase>

            <Box display="flex" m={-0.5}>
              <IconButton
                onClick={handleMaximizeClick}
                title={t('action.maximize')}
                icon={BiWindows}
                color="primary"
                size="small"
              />

              <IconButton
                onClick={handleMeetingEndClick}
                title={t('action.leaveMeeting')}
                icon={BiXCircle}
                color="error"
                size="small"
              />
            </Box>
          </Box>
        )}
      </Popper>
    </>
  );
};
