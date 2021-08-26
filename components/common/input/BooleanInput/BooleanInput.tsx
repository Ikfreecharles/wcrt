import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from '@material-ui/core';

import { CommonInputProps } from 'types';

/** Renders a simple checkbox input to be used within a `FormWrapper`. */
export const BooleanInput: React.FC<CommonInputProps> = ({
  name,
  rules,
  label,
  helperText,
  disabled,
  disableSpacing,
  use,
}) => {
  // Skip unintialized inputs, as we initialize them later via `createElement`.
  if (!use) return null;

  // Do not store errors of hidden inputs.
  useEffect(() => () => use.clearErrors(name), []);

  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={false}
      control={use.control}
      render={({ field, fieldState }) => (
        <Box pb={disableSpacing ? undefined : 2}>
          <FormControl
            fullWidth
            disabled={disabled || use.formState.isSubmitting}
            error={fieldState.invalid}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  inputProps={{
                    'aria-invalid': fieldState.invalid ? 'true' : 'false',
                  }}
                />
              }
              label={label}
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
