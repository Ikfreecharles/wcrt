import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { Box, TextField, Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import { CommonInputProps } from 'types';
import { useElementId } from 'hooks/helper';

type Props = CommonInputProps & {
  type?: string;
  autoComplete?: string;
  rows?: number;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  counter: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: spacing(1, 1.5),
  },
  errorText: {
    color: palette.error.main,
  },
}));

/** Renders a simple text input to be used within a `FormWrapper`. */
export const TextInput: React.FC<Props> = ({
  name,
  rules,
  label,
  helperText,
  disabled,
  type,
  autoComplete,
  rows,
  disableSpacing,
  use,
}) => {
  // Skip unintialized inputs, as we initialize them later via `createElement`.
  if (!use) return null;

  const id = useElementId('input');
  const classes = useStyles();

  // Do not store errors of hidden inputs.
  useEffect(() => () => use.clearErrors(name), []);

  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue=""
      control={use.control}
      render={({ field, fieldState }) => (
        <Box pb={disableSpacing ? undefined : 2}>
          <TextField
            {...field}
            variant="filled"
            multiline={!!rows}
            fullWidth
            type={type}
            name={name}
            inputProps={rows ? { rowsMin: rows } : undefined}
            InputProps={{
              endAdornment:
                typeof field.value?.length === 'number' &&
                typeof rules?.maxLength === 'number' &&
                field.value.length > 0 ? (
                  <Typography
                    component="p"
                    variant="caption"
                    color="textSecondary"
                    className={clsx(
                      classes.counter,
                      fieldState.invalid && classes.errorText
                    )}
                  >
                    {field.value.length}/{rules.maxLength}
                  </Typography>
                ) : undefined,
            }}
            label={label}
            helperText={fieldState.error?.message || helperText}
            autoComplete={autoComplete}
            disabled={disabled || use.formState.isSubmitting}
            error={fieldState.invalid}
            id={id}
          />
        </Box>
      )}
    />
  );
};
