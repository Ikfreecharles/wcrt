import NextLink from 'next/link';
import { Box, Typography, Card, Button, makeStyles } from '@material-ui/core';
import { IconType } from 'react-icons';
import clsx from 'clsx';

import { IconDisplay } from 'components/common/misc';

type Props = {
  /** An icon to display at the top */
  icon: IconType;
  /** A text to explain the action */
  text: string;
  /** The label of the button */
  buttonLabel: string;
  /** The action to execute */
  buttonOnClick?: () => void;
  /** An alternative link target */
  buttonHref?: string;
  /** A little label to give an additional hint */
  banner?: string;
};

const useStyles = makeStyles(({ spacing, palette, shadows }) => ({
  root: {
    position: 'relative',
    width: '100%',
    padding: spacing(3),
    textAlign: 'center',
  },
  disabled: {
    color: palette.text.disabled,
    cursor: 'default',
  },
  banner: {
    position: 'absolute',
    left: '50%',
    top: spacing(5),
    zIndex: 1,
    width: '200%',
    padding: spacing(0.5, 1),
    transform: 'translateX(-50%) rotate(-5deg)',
    transformOrigin: 'center',
    backgroundColor: palette.secondary.light,
    color: palette.secondary.dark,
    whiteSpace: 'nowrap',
    boxShadow: shadows[2],
  },
}));

/**
 * Renders a card to emphasize a certain action. Uses an icon and a explanation
 * text to give more context.
 */
export const ActionDisplay: React.FC<Props> = ({
  icon,
  text,
  buttonLabel,
  buttonOnClick,
  buttonHref,
  banner,
}) => {
  const classes = useStyles();

  const isDisabled = !(buttonOnClick || buttonHref);

  return (
    <Card
      variant="outlined"
      className={clsx(classes.root, isDisabled && classes.disabled)}
    >
      {banner && (
        <Box className={classes.banner}>
          <Typography variant="overline">{banner}</Typography>
        </Box>
      )}
      <Box mb={2}>
        <IconDisplay icon={icon} color={isDisabled ? 'disabled' : 'primary'} />
      </Box>

      <Typography component="p" variant="body2" paragraph>
        {text}
      </Typography>

      {buttonHref ? (
        <NextLink href={buttonHref} passHref>
          <Button color="primary">{buttonLabel}</Button>
        </NextLink>
      ) : (
        <Button color="primary" onClick={buttonOnClick} disabled={isDisabled}>
          {buttonLabel}
        </Button>
      )}
    </Card>
  );
};
