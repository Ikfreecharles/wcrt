import { useEffect } from 'react';
import { formStatus } from 'testing/util';

export const useFormStatus = (onFormCompleted?: () => void) => {
  useEffect(() => {
    if (formStatus.formStatus === 'completed') onFormCompleted?.();
  }, [formStatus.formStatus]);

  return { ...formStatus };
};

export const useFormStatusUpdate = jest.fn();

export const useFormErrorHandling = () => ({
  handleFormError: jest.fn(),
});
