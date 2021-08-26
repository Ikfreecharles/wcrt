import NextLink from 'next/link';
import { Box, Tooltip, Button, SvgIcon, makeStyles } from '@material-ui/core';
import { BiLike, BiMessage } from 'react-icons/bi';
import LikeSolidSvg from 'boxicons/svg/solid/bxs-like.svg';
import MessageSolidSvg from 'boxicons/svg/solid/bxs-message.svg';

import { useTranslation } from 'lib/i18n';
import { signIn, useSession } from 'lib/auth';
import { getEntityPath } from 'util/url';
import { useContentState } from 'hooks/content';
import { useSupport } from 'hooks/support';

type Props = {
  /** The content ID */
  id: string;
  /** The button size */
  size?: 'small' | 'medium' | 'large';
  /** The total numer of supports */
  supportCount: number;
  /** The total numer of comments */
  commentCount: number;
  /** Custom styles */
  className?: string;
};

const useStyles = makeStyles(({ spacing }) => ({
  supportButton: {
    marginRight: spacing(0.5),
  },
}));

/**
 * Renders content metrics and interactions for comments and supports. Meant to
 * be used within teaser components.
 */
export const ContentReactions: React.FC<Props> = ({
  id,
  supportCount,
  commentCount,
  size,
  className,
}) => {
  const { t } = useTranslation();
  const [session] = useSession();
  const { supported, commented } = useContentState(id);
  const { toggleSupport, supportPending } = useSupport(id);
  const classes = useStyles();

  const handleSupportClick = () => (session ? toggleSupport() : signIn());

  return (
    <Box className={className}>
      <Tooltip title={t('action.support')!}>
        <Button
          onClick={handleSupportClick}
          size={size}
          color="inherit"
          startIcon={<SvgIcon component={supported ? LikeSolidSvg : BiLike} />}
          disabled={supportPending}
          className={classes.supportButton}
          aria-pressed={!!supported}
        >
          {t('format.largeNumber', { number: supportCount })}
        </Button>
      </Tooltip>

      <NextLink href={getEntityPath(id)}>
        <Tooltip title={t('action.reply')!}>
          <Button
            size={size}
            color="inherit"
            startIcon={
              <SvgIcon component={commented ? MessageSolidSvg : BiMessage} />
            }
          >
            {t('format.largeNumber', { number: commentCount })}
          </Button>
        </Tooltip>
      </NextLink>
    </Box>
  );
};
