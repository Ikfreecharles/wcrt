import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import {
  Box,
  FormControl,
  FormHelperText,
  Typography,
} from '@material-ui/core';

import { CommonInputProps } from 'types';
import { getListValidation } from 'util/validation';
import { OptionList } from 'components/common/control';

type Props = CommonInputProps & {
  listProps: React.ComponentProps<typeof OptionList>;
  onChange?: (values: string[]) => void;
};

/** Wraps an `OptionList` to be used as array input within a `FormWrapper`. */
export const OptionInput: React.FC<Props> = ({
  name,
  rules,
  label,
  helperText,
  disabled,
  listProps,
  onChange,
  disableSpacing,
  use,
}) => {
  // Skip unintialized inputs, as we initialize them later via `createElement`.
  if (!use) return null;

  // Do not store errors of hidden inputs.
  useEffect(() => () => use.clearErrors(name), []);

  const handleActivation = (values: string[]) => {
    use.setValue(name, values, { shouldValidate: true });
    onChange?.(values);
  };

  return (
    <Controller
      name={name}
      rules={{
        ...rules,
        validate: rules?.validate || getListValidation(rules),
      }}
      defaultValue={[]}
      control={use.control}
      render={({ field, fieldState }) => (
        <Box pb={disableSpacing ? undefined : 2}>
          <FormControl
            component="fieldset"
            fullWidth
            disabled={use.formState.isSubmitting}
            error={fieldState.invalid}
          >
            {label && (
              <Typography
                component="legend"
                variant="body2"
                color={fieldState.invalid ? 'error' : undefined}
                gutterBottom
              >
                {label}
              </Typography>
            )}

            <OptionList
              {...listProps}
              activeOptions={field.value}
              setActiveOptions={handleActivation}
              maxLength={
                typeof rules?.maxLength === 'number'
                  ? rules.maxLength
                  : undefined
              }
              disabled={disabled || use.formState.isSubmitting}
              error={fieldState.invalid}
            />

            {(helperText || fieldState.error?.message) && (
              <FormHelperText>
                {fieldState.error?.message || helperText}
              </FormHelperText>
            )}
          </FormControl>
        </Box>
      )}
    />
  );
};
