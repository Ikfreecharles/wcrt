import { Button } from '@material-ui/core';

import { useTranslation } from 'lib/i18n';
import { signIn } from 'lib/auth';

/** Renders a simple button which initializes the login process. */
export const LoginButton: React.FC = () => {
  const { t } = useTranslation();

  const handleClick = () => signIn();

  return <Button onClick={handleClick}>{t('action.signIn')}</Button>;
};
