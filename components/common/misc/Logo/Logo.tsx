import { Box, Typography, makeStyles, useTheme } from '@material-ui/core';
import clsx from 'clsx';

import { brandPalette } from 'lib/theme';

type Props = {
  /** Use a smaller horizontal version of the logo */
  small?: boolean;
  /** Hide typography elements */
  plain?: boolean;
  /** Custom styles */
  className?: string;
};

type StyleProps = Pick<Props, 'small' | 'plain'> & {
  color: {
    blue: string;
    green: string;
  };
};

const useStyles = makeStyles(({ spacing, transitions }) => ({
  root: ({ small }: StyleProps) => ({
    position: 'relative',
    margin: spacing(small ? -0.875 : -1.75),
    paddingRight: small ? spacing(10) : undefined,
  }),
  text: ({ color, small, plain }: StyleProps) => ({
    position: 'absolute',
    left: spacing(small ? 8 : 3),
    top: spacing(small ? 1.25 : 7),
    margin: 0,
    textTransform: 'uppercase',
    color: small ? color.blue : color.green,
    opacity: plain ? 0 : 1,
    transition: transitions.create('opacity'),
  }),
  text1: {
    display: 'block',
    fontWeight: 700,
    lineHeight: `${spacing(3)}px`,
  },
  text2: {
    display: 'block',
    fontWeight: 700,
    lineHeight: `${spacing(2)}px`,
    textIndent: spacing(1),
  },
  svg: ({ small }: StyleProps) => ({
    display: 'block',
    width: spacing(small ? 8 : 16),
    height: spacing(small ? 8 : 16),
  }),
}));

/** Renders the WeCreate brand logo. */
export const Logo: React.FC<Props> = ({ small, plain, className }) => {
  const { palette } = useTheme();
  const blue = brandPalette[palette.type].primary.color;
  const green = brandPalette[palette.type].secondary.color;
  const classes = useStyles({ color: { blue, green }, small, plain });

  return (
    <Box className={clsx(classes.root, className)}>
      <Box component="h1" className={classes.text} aria-hidden={plain}>
        <Typography component="span" variant="h5" className={classes.text1}>
          We
        </Typography>
        <Typography component="span" variant="h6" className={classes.text2}>
          Create
        </Typography>
      </Box>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 106 106"
        className={classes.svg}
        aria-hidden="true"
        data-testid="svg"
      >
        <defs>
          <linearGradient id="a" x1="100%" x2="0%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={blue} />
            <stop offset="100%" stopColor={green} />
          </linearGradient>
        </defs>

        <path
          fill="url(#a)"
          fillRule="nonzero"
          d="M41.933 12.5L67.181 1.259a7.499 7.499 0 019.794 3.57 7.003 7.003 0 017.187 4.113 6.758 6.758 0 015.309 4.045A6.5 6.5 0 0193.5 19v22.933l11.241 25.248a7.499 7.499 0 01-3.57 9.794 7.003 7.003 0 01-4.113 7.187 6.758 6.758 0 01-4.045 5.309A6.5 6.5 0 0187 93.5H64.067l-25.248 11.241a7.499 7.499 0 01-9.794-3.57 7.003 7.003 0 01-7.187-4.113 6.758 6.758 0 01-5.309-4.045A6.5 6.5 0 0112.5 87V64.067L1.259 38.819a7.499 7.499 0 013.57-9.794 7.003 7.003 0 014.113-7.187 6.758 6.758 0 014.045-5.309A6.5 6.5 0 0119 12.5h22.933zM52.43 95.397l-20.348 5.074a4.502 4.502 0 005.517 1.53l14.831-6.604zm-24.281 3.819l-1.118-2.512-2.941.309a5.01 5.01 0 004.059 2.203zm2.019-2.842l1.007 2.262 16.413-4.093-17.42 1.831zm-6.744-.799l2.965-.312-.785-1.763h-2.7l.48 1.925c.012.05.026.1.04.15zm-4.911-2.093a5.263 5.263 0 002.809 1.942l-.479-1.924H19c-.164 0-.326-.006-.487-.018zm10.375.018l.638 1.433L43.164 93.5H28.888zM15.566 72.338l1.953 18.578c.055.52.183 1.014.375 1.473.357.073.727.111 1.106.111h1.593l-5.027-20.162zm76.12 17.542c-.201.04-.405.071-.613.093L67.029 92.5H87a5.494 5.494 0 004.686-2.62zM22.655 92.5h2.504l-5.692-12.785L22.655 92.5zm30.667-79l-5.368.564-4.906 1.223L13.5 28.443v24.235l.564 5.368 1.223 4.906L28.443 92.5h24.235l5.368-.564 4.906-1.223L92.5 77.557V53.322l-.564-5.368-1.223-4.906L77.557 13.5H53.322zM13.5 67.029V87a5.494 5.494 0 002.62 4.686 6.803 6.803 0 01-.093-.613L13.5 67.029zm79 18.378l-20.162 5.027 18.578-1.953a5.237 5.237 0 001.473-.375c.073-.357.111-.727.111-1.106v-1.593zm2.924-.729l-1.924.479V87c0 .164-.006.326-.018.487a5.263 5.263 0 001.942-2.809zm-15.709 1.855L92.5 83.345v-2.504l-12.785 5.692zm15.86-3.957l-.312-2.965-1.763.785v2.7l1.925-.48c.05-.012.1-.026.15-.04zm3.641-4.725l-2.512 1.118.309 2.941a5.01 5.01 0 002.203-4.059zm-5.716-.739l1.433-.638L93.5 62.836v14.276zm2.874-1.28l2.262-1.007-4.093-16.413 1.831 17.42zm-.977-22.262l5.074 20.348a4.502 4.502 0 001.53-5.517L95.397 53.57zM5.529 32.082a4.502 4.502 0 00-1.53 5.517l6.604 14.831-5.074-20.348zm1.835-.907l4.093 16.413-1.831-17.42-2.262 1.007zm3.703-1.649L12.5 43.164V28.888l-1.433.638zM89.88 14.314c.04.201.071.405.093.613L92.5 38.971V19a5.494 5.494 0 00-2.62-4.686zm-4.473-.814l5.027 20.162-1.953-18.578a5.237 5.237 0 00-.375-1.473A5.517 5.517 0 0087 13.5h-1.593zM8.987 24.09a5.01 5.01 0 00-2.203 4.059l2.512-1.118-.309-2.941zm3.513-1.186l-1.925.48c-.05.012-.1.026-.15.04l.312 2.965 1.763-.785v-2.7zM80.841 13.5l5.692 12.785L83.345 13.5h-2.504zM13.5 22.655v2.504l12.785-5.692L13.5 22.655zm-.982-4.142a5.263 5.263 0 00-1.942 2.809l1.924-.479V19c0-.164.006-.326.018-.487zm.982 2.08l20.162-5.027-18.578 1.953a5.237 5.237 0 00-1.473.375A5.517 5.517 0 0013.5 19v1.593zM38.971 13.5H19a5.494 5.494 0 00-4.686 2.62c.201-.04.405-.071.613-.093L38.971 13.5zm45.707-2.924l.479 1.924H87c.164 0 .326.006.487.018a5.263 5.263 0 00-2.809-1.942zM62.836 12.5h14.276l-.638-1.433L62.836 12.5zm19.74-2.075l-2.965.312.785 1.763h2.7l-.48-1.925c-.012-.05-.026-.1-.04-.15zm-24.164 1.032l17.42-1.831-1.007-2.262-16.413 4.093zm15.506-5.928a4.502 4.502 0 00-5.517-1.53L53.57 10.603l20.348-5.074zm3.933 1.255l1.118 2.512 2.941-.309a5.01 5.01 0 00-4.059-2.203z"
        />
      </svg>
    </Box>
  );
};
