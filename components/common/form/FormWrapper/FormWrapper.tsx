import { Children, isValidElement, cloneElement, useEffect } from 'react';
import { RegisterOptions, useForm } from 'react-hook-form';
import { Box } from '@material-ui/core';

import { CommonFormProps, CommonInputProps } from 'types';
import { FieldError } from 'lib/error';
import { useFormStatusUpdate } from 'hooks/form';
import { FormSection } from 'components/common/form';

type Props = CommonFormProps & {
  /** The accessible title of the form */
  title: string;
  /** Prepopulated form values (usually provided via GraphQL) */
  defaultValues?: Record<string, any>;
  /** The action to execute after successful validation */
  onSubmit: (data: any) => Promise<void>;
  /** An external error (usually provided by the server after submit) */
  externalError?: FieldError;
  /** The ID to set for the form element */
  id: string;
};

/**
 * Initializes the form state management and provides it to the input
 * components. Meant to be used as root element within a form component.
 */
export const FormWrapper: React.FC<Props> = ({
  title,
  mode,
  defaultValues,
  setStatus,
  onSubmit,
  externalError,
  id,
  children,
}) => {
  const form = useForm({
    mode,
    defaultValues,
  });

  const extendRules = (rules: CommonInputProps['rules']) => {
    // Implement a `matchField` rule to compare two fields for equality.
    if (rules?.matchField) {
      const { matchField, ...otherRules } = rules;
      const valueToMatch = form.watch(matchField);

      return {
        ...otherRules,
        validate: (value) =>
          otherRules.validate
            ? otherRules.validate(value) && value === valueToMatch
            : value === valueToMatch,
      } as RegisterOptions;
    }

    return rules;
  };

  const initializeInputComponents = (
    child: React.ReactNode
  ): React.ReactNode => {
    if (!isValidElement(child)) return child;

    // Hide form sections when the referenced boolean field value is false.
    if (child.type === FormSection) {
      if (child.props.when && !form.watch(child.props.when)) return null;

      return cloneElement(child, {
        ...child.props,
        children: Children.map(child.props.children, initializeInputComponents),
      });
    }

    // Add form state functionality to the input components.
    if (child.props.name)
      return cloneElement(child, {
        ...child.props,
        rules: extendRules(child.props.rules),
        use: form,
        key: child.props.name,
      });

    return child;
  };

  useFormStatusUpdate(setStatus, form.formState);

  useEffect(() => {
    if (externalError)
      form.setError(externalError.name, { message: externalError.message });
  }, [externalError]);

  return (
    <form
      onSubmit={form.handleSubmit((data: unknown) => onSubmit(data))}
      id={id}
      aria-label={title}
      noValidate
    >
      <Box mb={-2}>{Children.map(children, initializeInputComponents)}</Box>
    </form>
  );
};
