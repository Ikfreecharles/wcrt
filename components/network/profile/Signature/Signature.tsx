import NextLink from 'next/link';
import { Box, ButtonBase, Typography, makeStyles } from '@material-ui/core';
import { light, dark } from '@material-ui/core/styles/createPalette';
import clsx from 'clsx';

import { AgentSignatureFragment } from 'lib/graphql';
import { getEntityPath } from 'util/url';
import { ConditionalWrapper } from 'components/common/misc';
import { Avatar } from 'components/network/profile';

type Props = {
  /** Raw GraphQL data */
  data: AgentSignatureFragment;
  /** Custom caption */
  caption?: string;
  /** Hide the caption and use a small avatar */
  compact?: boolean;
  /** Prepare styles to be used on a solid background */
  invert?: boolean;
  /** Navigate to the profile page on click */
  link?: boolean;
  /** Custom styles */
  className?: string;
};

type StyleProps = Pick<Props, 'compact' | 'invert'>;

const useStyles = makeStyles(({ spacing, palette, mixins }) => {
  const contrast = palette.type === 'light' ? dark : light;

  return {
    root: {
      minWidth: 0,
    },
    button: {
      maxWidth: '100%',
    },
    textContainer: ({ compact }: StyleProps) => ({
      marginLeft: compact ? spacing(1) : spacing(2),
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      minWidth: 0,
    }),
    text: {
      ...mixins.truncateText,
    },
    textPrimary: ({ invert }: StyleProps) => ({
      color: invert ? contrast.text.primary : palette.text.primary,
    }),
    textSecondary: ({ invert }: StyleProps) => ({
      color: invert ? contrast.text.secondary : palette.text.secondary,
    }),
  };
});

/**
 * Renders the avatar of a person or a group next to its name. Uses additional
 * info about the agent as the caption per default.
 */
export const Signature: React.FC<Props> = ({
  data,
  caption,
  compact,
  invert,
  link = true,
  className,
}) => {
  const classes = useStyles({ compact, invert });

  return (
    <Box display="flex" className={clsx(classes.root, className)}>
      <ConditionalWrapper
        condition={link}
        wrap={(children) => (
          <NextLink href={getEntityPath(data.id)} passHref>
            <ButtonBase
              onMouseDown={(e) => e.stopPropagation()}
              className={classes.button}
            >
              {children}
            </ButtonBase>
          </NextLink>
        )}
      >
        <Avatar data={data} size={compact ? 'small' : 'medium'} />

        <Box className={classes.textContainer}>
          <Typography
            component="p"
            variant="body2"
            className={clsx(classes.text, classes.textPrimary)}
          >
            {data.name}
          </Typography>

          {!compact && (data.info || caption) && (
            <Typography
              component="p"
              variant="body2"
              className={clsx(classes.text, classes.textSecondary)}
            >
              {caption || data.info}
            </Typography>
          )}
        </Box>
      </ConditionalWrapper>
    </Box>
  );
};
