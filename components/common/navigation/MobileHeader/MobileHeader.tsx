import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import NextLink from 'next/link';
import {
  Box,
  AppBar,
  Container,
  makeStyles,
  useTheme,
} from '@material-ui/core';
import { BiHelpCircle, BiXCircle } from 'react-icons/bi';
import clsx from 'clsx';

import { useTranslation } from 'lib/i18n';
import { useSession } from 'lib/auth';
import { useSettings } from 'hooks/settings';
import { Logo, WelcomeText } from 'components/common/misc';
import { AccountMenu } from 'components/common/navigation';
import {
  IconButton,
  FeedbackButton,
  LoginButton,
  AppearanceSettingsButton,
} from 'components/common/control';

type Props = {
  /** Use a shadow to elevate the header */
  elevated?: boolean;
  /** Hide the mobile header */
  hidden?: boolean;
  /** A function to populate the components height */
  setHeight?: Dispatch<SetStateAction<number>>;
};

type StyleProps = Pick<Props, 'elevated'> & {
  expanded: boolean;
  height: number;
};

const useStyles = makeStyles(
  ({ breakpoints, spacing, palette, transitions }) => ({
    placeholder: ({ height }: StyleProps) => ({
      height,
      transition: transitions.create('height'),
    }),
    borderBottom: {
      borderBottomWidth: 1,
      borderBottomStyle: 'solid',
      borderBottomColor: palette.divider,
      marginBottom: -1,
    },
    container: {
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: spacing(0.5),
      paddingBottom: spacing(0.5),
    },
    logo: ({ expanded }: StyleProps) => ({
      flex: '0',
      margin: expanded ? spacing(2.25, 0) : spacing(-9, 0, 0),
      transition: transitions.create('margin'),
    }),
    visbilityTransition: {
      transition: transitions.create(['transform', 'opacity']),
    },
    hidden: {
      transform: 'translateY(-100%)',
      opacity: 0,
      pointerEvents: 'none',
    },
    text: ({ expanded }: StyleProps) => ({
      position: 'absolute',
      left: spacing(16),
      top: '50%',
      transform: 'translateY(-50%)',
      width: `calc(100% - ${spacing(16)})`,
      padding: spacing(1, 1, 0),
      opacity: expanded ? 1 : 0,
      pointerEvents: expanded ? 'auto' : 'none',
      transition: transitions.create('opacity'),
      [breakpoints.up('sm')]: {
        padding: spacing(1, 4, 0),
      },
    }),
  })
);

/**
 * Renders globally visible elements for small screens. Can be expanded to show
 * a welcome text. Syncs with the local state. If using a fixed position, it
 * should be hidden while scrolling down and made visible/elevated when scrolling up.
 */
export const MobileHeader: React.FC<Props> = ({
  elevated,
  hidden,
  setHeight,
}) => {
  const { t } = useTranslation();
  const [session] = useSession();
  const [{ headerState }, setSettings] = useSettings();
  const [animated, setAnimated] = useState(false);
  const { spacing } = useTheme();
  const expanded = headerState === 'expanded' && !session;
  const height = expanded ? spacing(18) : spacing(7);
  const classes = useStyles({ expanded, height });

  // Set the placeholder height.
  useEffect(() => {
    setHeight?.(height);
  }, [height]);

  // Prevent initial transitions.
  useEffect(() => {
    if (animated && !elevated) setAnimated(false);
    if (!animated && hidden) setAnimated(true);
  }, [elevated, hidden]);

  const handleToggleClick = () => {
    setSettings({
      headerState: expanded ? 'collapsed' : 'expanded',
    });
  };

  return (
    <>
      <AppBar
        position={elevated ? 'fixed' : 'static'}
        color={elevated ? 'inherit' : 'transparent'}
        elevation={elevated ? 4 : 0}
        className={clsx(
          !elevated && classes.borderBottom,
          animated && classes.visbilityTransition,
          hidden && classes.hidden
        )}
        id="mobile-header"
        data-testid="mobile"
      >
        <Container className={classes.container}>
          <Box className={classes.logo}>
            <NextLink href="/" passHref>
              <Box component="a">
                <Logo plain={!expanded} />
              </Box>
            </NextLink>
          </Box>

          <Box className={classes.text} aria-hidden={!expanded}>
            <WelcomeText condensed />
          </Box>

          {session ? (
            <Box display="flex" alignItems="center">
              <FeedbackButton />
              <AccountMenu />
            </Box>
          ) : (
            <Box display="flex" alignItems="flex-start">
              <Box
                display="flex"
                alignItems="center"
                className={clsx(
                  classes.visbilityTransition,
                  expanded && classes.hidden
                )}
                aria-hidden={expanded}
              >
                <LoginButton />
                <AppearanceSettingsButton />
              </Box>

              <IconButton
                title={expanded ? t('action.close')! : t('label.about')}
                icon={expanded ? BiXCircle : BiHelpCircle}
                edge="end"
                color={expanded ? 'primary' : undefined}
                onClick={handleToggleClick}
                aria-expanded={expanded}
                aria-controls="mobile-header"
              />
            </Box>
          )}
        </Container>
      </AppBar>

      {elevated && <Box className={classes.placeholder} />}
    </>
  );
};
