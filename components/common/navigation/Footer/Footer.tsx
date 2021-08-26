import NextLink from 'next/link';
import { Box, Link, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { WEBSITE_URL, EXTERNAL_LINK_PROPS, SUPPORT_URL } from 'lib/constants';
import { useTranslation } from 'lib/i18n';
import { useColumnQuery } from 'hooks/layout';
import { Logo } from 'components/common/misc';

type Props = {
  /** Custom styles */
  className?: string;
};

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
  logo: {
    '&:not(:hover)': { filter: 'grayscale(100%)', opacity: 0.5 },
  },
  text: {
    fontSize: typography.caption.fontSize,
    color: palette.text.disabled,
  },
  link: {
    padding: spacing(0, 0.75),
  },
  linkContainer: {
    margin: spacing(0, -0.75),
  },
}));

/** Renders a globally visible footer with a logo and some additional links. */
export const Footer: React.FC<Props> = ({ className }) => {
  const { t } = useTranslation();
  const shouldNotWrap = useColumnQuery(400);
  const classes = useStyles();

  return (
    <Box
      display="flex"
      flexDirection={shouldNotWrap ? 'row' : 'column'}
      justifyContent="space-between"
      alignItems={shouldNotWrap ? 'center' : 'flex-start'}
      className={clsx(className, classes.text)}
    >
      <Box className={classes.logo}>
        <Link href={WEBSITE_URL} {...EXTERNAL_LINK_PROPS}>
          <Logo small />
        </Link>
      </Box>

      <Box mt={shouldNotWrap ? 0 : 2}>
        <Box
          textAlign={shouldNotWrap ? 'right' : 'left'}
          className={classes.linkContainer}
        >
          <Link
            href={SUPPORT_URL}
            {...EXTERNAL_LINK_PROPS}
            className={clsx(classes.text, classes.link)}
          >
            {t('label.help')}
          </Link>

          <NextLink href="/info/terms" passHref>
            <Link className={clsx(classes.text, classes.link)}>
              {t('label.terms')}
            </Link>
          </NextLink>
        </Box>

        <Box
          textAlign={shouldNotWrap ? 'right' : 'left'}
          className={classes.linkContainer}
        >
          <Link
            href={WEBSITE_URL}
            {...EXTERNAL_LINK_PROPS}
            className={clsx(classes.text, classes.link)}
          >
            {t('label.aboutUs')}
          </Link>

          <NextLink href="/info/privacy" passHref>
            <Link className={clsx(classes.text, classes.link)}>
              {t('label.privacy')}
            </Link>
          </NextLink>

          <NextLink href="/info/imprint" passHref>
            <Link className={clsx(classes.text, classes.link)}>
              {t('label.imprint')}
            </Link>
          </NextLink>
        </Box>
      </Box>
    </Box>
  );
};
