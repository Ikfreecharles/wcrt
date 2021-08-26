import { isValidElement } from 'react';
import { Box, Grid, makeStyles, Tooltip, Typography } from '@material-ui/core';
import clsx from 'clsx';

import { AgentAvatarFragment } from 'lib/graphql';
import { Avatar } from 'components/network/profile';
import { ConditionalWrapper } from 'components/common/misc';

type Props = {
  /** A list of avatar data */
  items: AgentAvatarFragment[];
  /** Use linked avatars */
  linked?: boolean;
  /** Display the avatars in a truncated row */
  compact?: boolean;
  /** Number of avatars to truncate at (compact mode only) */
  maxItems?: number;
  /** The background color (compact mode only) */
  background?: 'paper' | 'default';
};

type StyleProps = Required<Pick<Props, 'background'>>;

const useStyles = makeStyles(({ spacing, palette }) => ({
  overlappingContainer: {
    paddingLeft: spacing(2),
  },
  overlappingItem: {
    marginLeft: spacing(-2),
  },
  overlappingAvatar: ({ background }: StyleProps) => ({
    border: `2px solid ${palette.background[background]}`,
  }),
  extraAvatar: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: spacing(5),
    height: spacing(5),
    color: palette.background.default,
    backgroundColor:
      palette.type === 'light' ? palette.grey[400] : palette.grey[600],
    borderRadius: '50%',
    cursor: 'default',
  },
}));

/**
 * Renders multiple avatars side-by-side. Uses a grid layout per default, but
 * can also be limited to a row with truncated results.
 */
export const AvatarList: React.FC<Props> = ({
  items,
  linked,
  compact,
  maxItems,
  background = 'default',
}) => {
  const classes = useStyles({ background });

  const maxAvatars = maxItems ? Math.max(maxItems - 1, 1) : items.length;
  const hiddenItems =
    maxAvatars < items.length - 1 ? items.length - maxAvatars : 0;

  return (
    <Box className={clsx(compact && classes.overlappingContainer)}>
      <Grid container spacing={1}>
        {items.slice(0, items.length - hiddenItems).map((item, index) => (
          <Grid item key={index}>
            <ConditionalWrapper
              condition={linked}
              wrap={(children) =>
                isValidElement(children) ? (
                  <Tooltip title={item.name}>{children}</Tooltip>
                ) : (
                  <>children</>
                )
              }
            >
              <Box className={clsx(compact && classes.overlappingItem)}>
                <Avatar
                  linked={linked}
                  data={item}
                  className={clsx(compact && classes.overlappingAvatar)}
                />
              </Box>
            </ConditionalWrapper>
          </Grid>
        ))}

        {hiddenItems > 0 && (
          <Grid item>
            <Box
              className={clsx(
                classes.extraAvatar,
                compact && classes.overlappingItem,
                compact && classes.overlappingAvatar
              )}
            >
              <Typography variant="subtitle2">+{hiddenItems}</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
