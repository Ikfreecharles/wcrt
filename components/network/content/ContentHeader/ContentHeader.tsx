import { Box, Typography, Chip, makeStyles } from '@material-ui/core';
import { light, dark } from '@material-ui/core/styles/createPalette';
import { BiBell } from 'react-icons/bi';
import BellSolidSvg from 'boxicons/svg/solid/bxs-bell.svg';

import { useTranslation } from 'lib/i18n';
import { useContentState } from 'hooks/content';
import { Feature } from 'components/common/misc';
import { IconButton } from 'components/common/control';

type Props = {
  /** The content ID */
  id: string;
  /** The type label */
  label: string;
  /** The timestamp */
  timestamp: Date;
  /** The timestamp type */
  timestampFormat?:
    | 'relativeCreationDate'
    | 'relativePastDate'
    | 'relativePublishDate'
    | 'relativeUpdateDate';
  /** Prepare styles to be used on a solid background */
  invert?: boolean;
  /** Custom styles */
  className?: string;
};

type StyleProps = Pick<Props, 'invert'>;

const useStyles = makeStyles(({ spacing, palette, typography, mixins }) => {
  const contrast = palette.type === 'light' ? dark : light;

  return {
    label: ({ invert }: StyleProps) => ({
      ...typography.overline,
      backgroundColor: invert
        ? palette.primary.contrastText
        : palette.secondary.main,
      color: invert ? palette.primary.main : palette.secondary.contrastText,
    }),
    timestamp: ({ invert }: StyleProps) => ({
      display: 'block',
      marginLeft: spacing(1),
      color: invert ? contrast.text.secondary : palette.text.secondary,
      ...mixins.truncateText,
    }),
    active: ({ invert }: StyleProps) => ({
      color: invert ? contrast.action.active : palette.action.active,
    }),
    disabled: ({ invert }: StyleProps) => ({
      color: invert ? contrast.action.disabled : palette.action.disabled,
    }),
  };
});

/**
 * Renders some content meta data (type and timestamp) and interactions
 * (subscribe). Meant to be used within content pages and teaser components.
 */
export const ContentHeader: React.FC<Props> = ({
  id,
  label,
  timestamp,
  timestampFormat = 'relativePastDate',
  invert,
  className,
}) => {
  const { t } = useTranslation();
  const { subscribed } = useContentState(id);
  const classes = useStyles({ invert });

  return (
    <Box className={className}>
      <Box display="flex" alignItems="center" m={-1} mr={-2}>
        <Box flex="0">
          <Chip label={label} className={classes.label} />
        </Box>

        <Box flex="1" minWidth={0}>
          <Typography variant="caption" className={classes.timestamp}>
            {t(`format.${timestampFormat}`, { date: timestamp })}
          </Typography>
        </Box>

        <Feature flag="showSubscribeButton" placeholder={<Box p={3} />}>
          <Box flex="0">
            <IconButton
              title={
                subscribed ? t('action.unsubscribe')! : t('action.subscribe')!
              }
              icon={subscribed ? BellSolidSvg : BiBell}
              className={subscribed ? classes.active : classes.disabled}
            />
          </Box>
        </Feature>
      </Box>
    </Box>
  );
};
