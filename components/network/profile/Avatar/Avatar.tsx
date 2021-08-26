import NextLink from 'next/link';
import {
  Avatar as MuiAvatar,
  SvgIcon,
  makeStyles,
  ButtonBase,
} from '@material-ui/core';
import clsx from 'clsx';
import upperFirst from 'lodash/upperFirst';
import { BiImage, BiGroup, BiSmile } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { AgentAvatarFragment } from 'lib/graphql';
import { getResizedImageUrl } from 'util/image';
import { getEntityPath } from 'util/url';
import { getUniqueColor } from 'util/style';
import { ConditionalWrapper } from 'components/common/misc';

type Props = {
  /** Raw GraphQL data */
  data?: Partial<AgentAvatarFragment> | null;
  /** The image size */
  size?: 'medium' | 'small' | 'large' | 'extra';
  /** Navigate to the profile page on click */
  linked?: boolean;
  /** Show an alternative fallback icon */
  fallbackIcon?: boolean;
  /** Custom styles */
  className?: string;
};

type StyleProps = {
  color: string | null;
  rounded: boolean;
};

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
  root: ({ color }: StyleProps) => ({
    color: color ? palette.getContrastText(color) : palette.background.default,
    backgroundColor:
      color ||
      (palette.type === 'light' ? palette.grey[400] : palette.grey[600]),
    pointerEvents: 'none',
  }),
  sizeSmall: ({ rounded }: StyleProps) => ({
    width: spacing(3),
    height: spacing(3),
    fontSize: typography.subtitle1.fontSize,
    borderRadius: rounded ? spacing(0.25) : undefined,
  }),
  sizeMedium: ({ rounded }: StyleProps) => ({
    width: spacing(5),
    height: spacing(5),
    fontSize: typography.h4.fontSize,
    borderRadius: rounded ? spacing(0.5) : undefined,
  }),
  sizeLarge: ({ rounded }: StyleProps) => ({
    width: spacing(13),
    height: spacing(13),
    fontSize: spacing(10),
    borderRadius: rounded ? spacing(1) : undefined,
  }),
  sizeExtra: ({ rounded }: StyleProps) => ({
    width: spacing(20),
    height: spacing(20),
    fontSize: spacing(15),
    borderRadius: rounded ? spacing(2) : undefined,
  }),
  button: ({ rounded }: StyleProps) => ({
    borderRadius: rounded ? spacing(2) : '50%',
  }),
}));

/**
 * Renders the profile image of a person or group. Shows a placeholder icon with
 * a unique color as fallback.
 */
export const Avatar: React.FC<Props> = ({
  data,
  size = 'medium',
  linked,
  className,
}) => {
  const { t } = useTranslation();
  const type = data?.__typename?.toLowerCase() || 'person';
  const color = data?.id && !data.imagedBy ? getUniqueColor(data?.id) : null;
  const classes = useStyles({ color, rounded: type === 'group' });

  const typeLabel = t(`label.${type}`);
  let icon = BiImage;

  switch (type) {
    case 'person':
      icon = BiSmile;
      break;
    case 'group':
      icon = BiGroup;
      break;
  }

  return (
    <ConditionalWrapper
      condition={!!linked && !!data?.id}
      wrap={(children) => (
        <NextLink href={getEntityPath(data!.id!)} passHref>
          <ButtonBase className={classes.button}>{children}</ButtonBase>
        </NextLink>
      )}
    >
      <MuiAvatar
        src={getResizedImageUrl(
          data?.imagedBy?.resourceLocation,
          (size ? `avatar${upperFirst(size)}` : 'avatar') as
            | 'avatarSmall'
            | 'avatarMedium'
            | 'avatarLarge'
            | 'avatarExtra'
        )}
        alt={type === 'person' ? data?.name : `${typeLabel}: ${data?.name}`}
        className={clsx(
          classes.root,
          classes[
            `size${upperFirst(size)}` as
              | 'sizeSmall'
              | 'sizeMedium'
              | 'sizeLarge'
          ],
          className
        )}
      >
        <SvgIcon component={icon} fontSize="inherit" />
      </MuiAvatar>
    </ConditionalWrapper>
  );
};
