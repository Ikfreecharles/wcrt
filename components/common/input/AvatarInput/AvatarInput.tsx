import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import {
  Box,
  ButtonBase,
  CircularProgress,
  FormControl,
  FormHelperText,
  makeStyles,
  Tooltip,
} from '@material-ui/core';
import { BiUpload, BiTrash } from 'react-icons/bi';
import clsx from 'clsx';

import { CommonInputProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { useImageInputProps } from 'hooks/input';
import { IconButton } from 'components/common/control';
import { Avatar } from 'components/network/profile';

type Props = CommonInputProps & {
  /** The agent type (used to determine the preview style) */
  type?: 'Person' | 'Group';
  /** The ID of the agent (used to calculate the placeholder color) */
  id?: string;
};

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    position: 'relative',
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    left: '100%',
    bottom: spacing(-1.5),
  },
  circlePreview: {
    borderRadius: '50%',
  },
  roundedPreview: {
    borderRadius: spacing(2),
  },
  previewProcessing: {
    opacity: palette.action.disabledOpacity,
  },
  processingIndicator: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%,-50%)',
  },
}));

/** Renders a single image input with an avatar preview to be used within a `FormWrapper`. */
export const AvatarInput: React.FC<Props> = ({
  type = 'Person',
  id,
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

  const { t } = useTranslation();
  const { getRootProps, getInputProps, open, progress } = useImageInputProps({
    name,
    maxLength: 1,
    use,
  });
  const classes = useStyles();
  const isProcessing = !!progress.length || use.formState.isSubmitting;

  const handleDeleteClick = () => {
    use.setValue(name, null);
  };

  // Do not store errors of hidden inputs.
  useEffect(() => () => use.clearErrors(name), []);

  return (
    <Controller
      name={name}
      rules={rules}
      defaultValue={null}
      control={use.control}
      render={({ field, fieldState }) => (
        <Box pb={disableSpacing ? undefined : 2}>
          <FormControl
            fullWidth
            disabled={disabled || isProcessing}
            error={fieldState.invalid}
          >
            <Box className={classes.container}>
              <Tooltip title={isProcessing ? '' : label!}>
                <ButtonBase
                  {...getRootProps()}
                  disabled={disabled || isProcessing}
                  className={
                    type === 'Person'
                      ? classes.circlePreview
                      : classes.roundedPreview
                  }
                  aria-label={label}
                  aria-invalid={fieldState.invalid}
                >
                  <Avatar
                    size="extra"
                    data={{
                      __typename: type,
                      id,
                      name: t('label.uploadedImage'),
                      imagedBy: field.value,
                    }}
                    className={clsx(isProcessing && classes.previewProcessing)}
                    key={field.value?.id}
                  />

                  {!!progress.length && (
                    <Box className={classes.processingIndicator}>
                      <CircularProgress
                        variant="determinate"
                        value={progress[0].value}
                      />
                    </Box>
                  )}

                  <input {...getInputProps()} data-testid="file-input" />
                </ButtonBase>
              </Tooltip>

              <Box display="flex" flexDirection="column" ml={0.5}>
                <IconButton
                  title={t('action.uploadImage')}
                  titlePlacement="right"
                  icon={BiUpload}
                  color="primary"
                  onClick={open}
                  disabled={disabled || isProcessing}
                />

                <IconButton
                  title={t('action.delete')}
                  titlePlacement="right"
                  icon={BiTrash}
                  onClick={handleDeleteClick}
                  disabled={disabled || isProcessing || !field.value}
                />
              </Box>
            </Box>

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
