import { FieldError } from 'lib/error';
import { useTranslation } from 'react-i18next';

import { AccountContactFormData, AccountPasswordFormData } from 'types';

/**
 * Returns a function to submit account contact data to the OAuth provider (via
 * API route).
 */
export const useAccountContactSubmit = () => {
  const { t } = useTranslation();

  return async (data: AccountContactFormData) => {
    const response = await fetch('/api/auth/update/email', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();

    if (
      responseData.error?.type === 'INVALID_VALUE' &&
      responseData.error?.fields.includes('email')
    )
      throw new FieldError('email', t('validation.emailInvalid'));

    if (
      responseData.error?.type === 'ALREADY_USED' &&
      responseData.error?.fields.includes('email')
    )
      throw new FieldError('email', t('validation.emailInUse'));

    if (
      responseData.error?.type === 'INVALID_VALUE' &&
      responseData.error?.fields.includes('currentPassword')
    )
      throw new FieldError('currentPassword', t('validation.passwordInvalid'));

    if (!response.ok && response.status !== 409)
      throw new Error('Invalid response');
  };
};

/**
 * Returns an async function to submit account password data to the OAuth
 * provider (via API route).
 */
export const useAccountPasswordSubmit = () => {
  const { t } = useTranslation();

  return async (data: AccountPasswordFormData) => {
    const response = await fetch('/api/auth/update/password', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const responseData = await response.json();

    if (
      responseData.error?.type === 'INVALID_VALUE' &&
      responseData.error?.fields.includes('currentPassword')
    )
      throw new FieldError('currentPassword', t('validation.passwordInvalid'));

    if (!response.ok && response.status !== 409)
      throw new Error('Invalid response');
  };
};
