import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { FormState } from 'react-hook-form';

import { FormResult, FormStatus } from 'types';
import { useTranslation } from 'lib/i18n';
import { FieldError } from 'lib/error';

/**
 * Returns reactive variables to communicate the current form state at the
 * parent component level.
 */
export const useFormStatus = (onFormCompleted?: () => void) => {
  const [formStatus, setFormStatus] = useState<FormStatus>();
  const [formResult, setFormResult] = useState<FormResult>();

  useEffect(() => {
    if (formStatus === 'completed') onFormCompleted?.();
  }, [formStatus]);

  return {
    formStatus,
    formResult,
    setFormStatus,
    setFormResult,
  };
};

/** Updates our custom form status when the form state of `react-hook-form` changes. */
export const useFormStatusUpdate = (
  setStatus: ReturnType<typeof useFormStatus>['setFormStatus'],
  formState: FormState<unknown>
) =>
  useEffect(() => {
    // We only want to watch validation results, so we can skip other events.
    if (!formState.isDirty || formState.isValidating || formState.isSubmitting)
      return;

    setStatus(Object.keys(formState.errors).length ? 'invalid' : 'valid');
  }, [formState]);

/**
 * Returns a function to handle form errors and an additional error state for
 * remote errors.
 */
export const useFormErrorHandling = (
  setStatus: ReturnType<typeof useFormStatus>['setFormStatus'],
  setResult?: ReturnType<typeof useFormStatus>['setFormResult']
) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [fieldError, setFieldError] = useState<FieldError>();

  const handleFormError = (error: Error) => {
    if (error instanceof FieldError) return setFieldError(error);

    console.error(error);
    enqueueSnackbar(t('notice.submitError'), { variant: 'error' });
    setResult?.({ error: error.message });
    setStatus('valid');
  };

  return { handleFormError, fieldError };
};
