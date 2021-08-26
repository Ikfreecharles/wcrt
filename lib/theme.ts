import {
  createMuiTheme,
  createGenerateClassName,
  fade,
} from '@material-ui/core';
import mediaQuery from 'css-mediaquery';
import { Palette as WeCreatePalette } from '@wecreateio/design-tokens';

import { MOBILE_NAV_HEIGHT } from 'lib/constants';
import { createTypographyGenerator, createPaletteConfig } from 'util/theme';

export const brandPalette = new WeCreatePalette();

/** Custom theming colors from the environment variables. */
const customColors = {
  light: {
    primary: process.env.NEXT_PUBLIC_CUSTOM_COLOR_PRIMARY,
    secondary: process.env.NEXT_PUBLIC_CUSTOM_COLOR_SECONDARY,
  },
  dark: {
    primary: process.env.NEXT_PUBLIC_CUSTOM_COLOR_DARK_PRIMARY,
    secondary: process.env.NEXT_PUBLIC_CUSTOM_COLOR_DARK_SECONDARY,
  },
};

/** Prepare a typography generator with our custom type scales. */
const generateTypography = createTypographyGenerator(14, 16, 1.2, {
  regular: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
});

/** Create our custom Material UI theme. */
export const createTheme = (
  paletteType?: string | null,
  expectDesktop = false
) => {
  const theme = createMuiTheme({
    palette: createPaletteConfig(brandPalette, customColors)[
      (paletteType as 'light' | 'dark') || 'light'
    ],
    typography: {
      fontFamily: 'Inter, sans-serif',
      h1: generateTypography('bold', 6, 6),
      h2: generateTypography('semiBold', 5, 5),
      h3: generateTypography('semiBold', 4, 4.5),
      h4: generateTypography('medium', 3, 4),
      h5: generateTypography('semiBold', 2, 3.5),
      h6: generateTypography('semiBold', 1, 3),
      subtitle1: generateTypography('medium', 1, 3),
      subtitle2: generateTypography('medium', 0, 2.5),
      body1: generateTypography('regular', 1, 3),
      body2: generateTypography('regular', 0, 2.5),
      button: generateTypography('semiBold', 0, 3, 0.02, false, {
        textTransform: 'uppercase',
      }),
      caption: generateTypography('regular', -0.5, 2),
      overline: generateTypography('semiBold', -1, 2, 0.1, false, {
        textTransform: 'uppercase',
      }),
    },
    mixins: {
      truncateText: {
        '&, & *': {
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
        },
      },
    },
    props: {
      MuiUseMediaQuery: {
        ssrMatchMedia: (query) => ({
          matches: mediaQuery.match(query, {
            width: expectDesktop ? '1024px' : '0px',
          }),
        }),
      },
    },
  });

  return createMuiTheme(
    {
      overrides: {
        MuiContainer: {
          root: {
            paddingLeft: `calc(${theme.spacing(
              2
            )}px + env(safe-area-inset-left))`,
            paddingRight: `calc(${theme.spacing(
              2
            )}px + env(safe-area-inset-right))`,
            fallbacks: {
              paddingLeft: theme.spacing(2),
              paddingRight: theme.spacing(2),
            },
            [theme.breakpoints.up('sm')]: {
              paddingLeft: `calc(${theme.spacing(
                3
              )}px + env(safe-area-inset-left))`,
              paddingRight: `calc(${theme.spacing(
                3
              )}px + env(safe-area-inset-right))`,
              fallbacks: {
                paddingLeft: theme.spacing(3),
                paddingRight: theme.spacing(3),
              },
            },
          },
        },
        MuiBottomNavigation: {
          root: {
            height: `calc(${MOBILE_NAV_HEIGHT}px + env(safe-area-inset-bottom))`,
            paddingBottom: 'env(safe-area-inset-bottom)',
            boxShadow: theme.shadows[8],
            fallbacks: {
              height: MOBILE_NAV_HEIGHT,
            },
          },
        },
        MuiBottomNavigationAction: {
          label: {
            hyphens: 'manual',
          },
        },
        MuiButton: {
          root: {
            color: theme.palette.action.active,
          },
        },
        MuiInputBase: {
          input: {
            hyphens: 'manual',
          },
        },
        MuiDialogContent: {
          root: {
            padding: 0,
          },
        },
        MuiDialogActions: {
          root: {
            borderTop: `1px solid ${theme.palette.divider}`,
          },
        },
        MuiDrawer: {
          paper: {
            width: `calc(100vw - ${theme.spacing(7)}px)`,
            [theme.breakpoints.up('sm')]: {
              width: `calc(100vw - ${theme.spacing(8)}px)`,
            },
          },
        },
        MuiListItem: {
          root: {
            color: theme.palette.text.secondary,
            '&$selected, &$selected:hover': {
              color: theme.palette.primary.main,
              backgroundColor: fade(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
            },
          },
        },
        MuiListItemIcon: {
          root: {
            minWidth: theme.spacing(5),
            color: 'inherit',
          },
        },
        MuiAccordion: {
          root: {
            '&$disabled': {
              backgroundColor: theme.palette.background.paper,
            },
          },
        },
        MuiAccordionSummary: {
          content: {
            justifyContent: 'space-between',
          },
          expandIcon: {
            '&$expanded': {
              transform: 'rotate(90deg)',
            },
          },
        },
        MuiAccordionDetails: {
          root: {
            display: 'block',
          },
        },
        MuiStepper: {
          root: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
        MuiStepIcon: {
          root: {
            '&$completed': {
              color: theme.palette.secondary.main,
            },
            '&$active': {
              color: theme.palette.secondary.main,
            },
          },
          text: {
            fontWeight: 500,
          },
        },
      },
    },
    theme
  );
};

/** Disable deterministic class names in production. */
export const generateClassName = createGenerateClassName({
  disableGlobal: process.env.NODE_ENV === 'production',
});
