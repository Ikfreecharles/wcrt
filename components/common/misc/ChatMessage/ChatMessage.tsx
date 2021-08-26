import { Box, makeStyles, Tooltip, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';

import { useTranslation } from 'lib/i18n';
import {
  AgentSignatureFragment,
  ChatMessageFragment,
  Maybe,
} from 'lib/graphql';
import { useProfile } from 'hooks/profile';
import { Avatar } from 'components/network/profile';

type Props = {
  /** Raw GraphQL data */
  data?: ChatMessageFragment;
  /** Additional author information (usually provided by `SupplementingChatMessage`) */
  author?: {
    loading: boolean;
    data?: Maybe<AgentSignatureFragment>;
  };
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-end',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing(1),
  },
  caption: {
    marginBottom: spacing(0.5),
    color: palette.text.disabled,
    cursor: 'default',
  },
  timestamp: {
    position: 'absolute',
    left: '50%',
    top: spacing(-2.5),
    transform: 'translateX(-50%)',
    whiteSpace: 'nowrap',
  },
  name: {
    marginLeft: spacing(2),
    marginRight: spacing(2),
  },
  bubble: {
    position: 'relative',
    padding: spacing(1.25, 2),
    backgroundColor:
      palette.type === 'light' ? palette.grey[100] : palette.grey[700],
    borderRadius: spacing(2.5),
    '&::before': {
      content: '""',
      position: 'absolute',
      left: spacing(-3.5),
      bottom: 0,
      display: 'block',
      width: spacing(6),
      height: spacing(2.5),
      backgroundColor:
        palette.type === 'light' ? palette.grey[100] : palette.grey[700],
      mask: `radial-gradient(
          circle at 0 0,
          transparent ${spacing(3.5)}px,
          white ${spacing(3.5)}px
        )`,
    },
  },
  emphasizedBubble: {
    backgroundColor:
      palette.type === 'light' ? palette.grey[300] : palette.grey[900],
    '&::before': {
      backgroundColor:
        palette.type === 'light' ? palette.grey[300] : palette.grey[900],
    },
  },
  bubbleContent: {
    position: 'relative',
  },
}));

/**
 * Renders a chat message with some meta data and author information. Handles
 * the loading state of the author data. Meant to be used within a chat message stream.
 */
export const ChatMessage: React.FC<Props> = ({ data, author }) => {
  const { t } = useTranslation();
  const viewerProfile = useProfile();
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.avatarContainer}>
        {!data ? (
          <Typography
            component="p"
            variant="caption"
            className={clsx(classes.caption)}
          >
            <Skeleton />
          </Typography>
        ) : (
          <Tooltip
            title={t(`format.dateTime`, { date: data.createdAt })!}
            placement="top"
          >
            <Typography
              component="p"
              variant="caption"
              className={clsx(classes.caption, classes.timestamp)}
            >
              {t(`format.shortTime`, { date: data.createdAt })}
            </Typography>
          </Tooltip>
        )}

        {!author || author.loading ? (
          <Skeleton
            variant="circle"
            role="progressbar"
            aria-label={t('label.loadingImage')}
          >
            <Avatar />
          </Skeleton>
        ) : (
          <Avatar data={author.data} />
        )}
      </Box>

      <Box>
        <Typography
          component="p"
          variant="caption"
          className={clsx(classes.caption, classes.name)}
        >
          {!author || author.loading ? (
            <Skeleton
              width={120}
              role="progressbar"
              aria-label={t('label.loadingName')}
            />
          ) : (
            author.data?.name || t('label.unknown')
          )}
        </Typography>

        {!data ? (
          <Skeleton
            variant="rect"
            width={240}
            height={40}
            className={classes.bubble}
          />
        ) : (
          <Box
            className={clsx(
              classes.bubble,
              data.authorId === viewerProfile?.representedBy.id &&
                classes.emphasizedBubble
            )}
          >
            <Typography
              component="p"
              variant="body2"
              className={classes.bubbleContent}
            >
              {data.content}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
