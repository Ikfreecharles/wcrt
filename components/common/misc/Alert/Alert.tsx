import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Box, Typography, Button } from '@material-ui/core';
import { IconType } from 'react-icons';
import {
  BiError,
  BiGhost,
  BiCoffee,
  BiMailSend,
  BiRocket,
} from 'react-icons/bi';

import { SUPPORT_EMAIL } from 'lib/constants';
import { useTranslation } from 'lib/i18n';
import { IconDisplay } from 'components/common/misc';

type Props = {
  /** The preset configuration to use */
  type:
    | 'error'
    | 'remoteError'
    | 'notFound'
    | 'comeBackLater'
    | 'messageSent'
    | 'publish';
  /** Reduce the padding */
  narrow?: boolean;
  /** A custom icon to display at the top */
  icon?: IconType;
  /** A custom title */
  title?: string;
  /** A custom message text */
  message?: string;
  /** A custom button label */
  buttonLabel?: string;
  /** A custom title */
  onClick?: () => void;
  href?: string;
  info?: string;
};

/**
 * Renders a combination of an icon, a headline, a text and an optional button
 * as an alert notification. Provides various preset configurations, but also
 * can be customized. Meant to be used as error state or an action result.
 */
export const Alert: React.FC<Props> = ({
  type,
  narrow,
  icon,
  title,
  message,
  buttonLabel,
  onClick,
  href,
  info,
}) => {
  const { t } = useTranslation();
  const { asPath } = useRouter();

  const getDefaultIcon = () => {
    switch (type) {
      case 'error':
      case 'remoteError':
        return BiError;
      case 'notFound':
        return BiGhost;
      case 'comeBackLater':
        return BiCoffee;
      case 'messageSent':
        return BiMailSend;
      case 'publish':
        return BiRocket;
    }
  };

  const getButton = () => {
    switch (type) {
      case 'error':
        return (
          <Button variant="contained" href={`mailto:${SUPPORT_EMAIL}`}>
            {buttonLabel || t('action.contactSupport')}
          </Button>
        );
      case 'remoteError':
        return (
          <Button variant="contained" href={asPath}>
            {buttonLabel || t('action.tryAgain')}
          </Button>
        );
    }
  };

  return (
    <Box p={narrow ? [0, 2] : [0, 4, 8]} textAlign="center">
      <Box mb={2}>
        <IconDisplay icon={icon || getDefaultIcon()} color="secondary" />
      </Box>

      <Typography component="h2" variant="h5" gutterBottom>
        {title || t(`alert.${type}.title`)}
      </Typography>

      <Typography variant="body1" paragraph>
        {message || t(`alert.${type}.body`)}
      </Typography>

      {getButton() ||
        (onClick && (
          <Button variant="contained" onClick={onClick}>
            {buttonLabel || t('action.confirm')}
          </Button>
        )) ||
        (href && (
          <NextLink href={href} passHref>
            <Button variant="contained">
              {buttonLabel || t('action.confirm')}
            </Button>
          </NextLink>
        ))}

      {info && (
        <Box fontFamily="monospace" mt={3}>
          {info}
        </Box>
      )}
    </Box>
  );
};
