import { useEffect } from 'react';
import { Controller } from 'react-hook-form';
import {
  Badge,
  Box,
  ButtonBase,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { BiImageAdd } from 'react-icons/bi';
import clsx from 'clsx';

import { CommonInputProps } from 'types';
import { useTranslation } from 'lib/i18n';
import { DocumentFragment } from 'lib/graphql';
import { useImageInputProps } from 'hooks/input';
import { getResizedImageUrl } from 'util/image';
import { getListValidation } from 'util/validation';
import { IconWrapper } from 'components/common/misc';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    position: 'relative',
    width: '100%',
    padding: spacing(1),
    overflow: 'hidden',
    backgroundColor: palette.action.hover,
    border: `1px dashed ${palette.action.active}`,
    borderRadius: 4,
  },
  previewProcessing: {
    opacity: palette.action.disabledOpacity,
  },
  button: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  previewItem: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: spacing(6),
    height: spacing(6),
    overflow: 'hidden',
    backgroundColor:
      palette.type === 'light' ? palette.grey[400] : palette.grey[600],
    borderRadius: 4,
  },
  previewImg: {
    width: '100%',
    height: '100%',
  },
  deleteBadge: {
    padding: 0,
    overflow: 'hidden',
    '&:hover': {
      backgroundColor: palette.error.dark,
    },
  },
  deleteButton: {
    width: '100%',
    height: '100%',
    font: 'inherit',
  },
  placeholder: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    minHeight: spacing(6),
    color: palette.text.secondary,
    pointerEvents: 'none',
  },
}));

/** Renders a multi-image input to be used within a `FormWrapper`. */
export const ImageInput: React.FC<CommonInputProps> = ({
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
  const { getRootProps, getInputProps, progress } = useImageInputProps({
    name,
    maxLength: rules?.maxLength,
    use,
  });
  const classes = useStyles();
  const isProcessing = !!progress.length || use.formState.isSubmitting;

  const getDeleteClickHandler = (id: string) => () => {
    const currentFiles: DocumentFragment[] = use.getValues(name);
    use.setValue(
      name,
      currentFiles.filter((file) => file.id !== id)
    );
  };

  // Do not store errors of hidden inputs.
  useEffect(() => () => use.clearErrors(name), []);

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
            disabled={disabled || isProcessing}
            error={fieldState.invalid}
            fullWidth
          >
            <Box
              className={clsx(
                classes.container,
                use.formState.isSubmitting && classes.previewProcessing
              )}
            >
              <ButtonBase
                {...getRootProps()}
                disabled={disabled || isProcessing}
                className={classes.button}
                aria-label={label}
                aria-invalid={fieldState.invalid}
              >
                <input {...getInputProps()} data-testid="file-input" />
              </ButtonBase>

              {!!field.value?.length || !!progress.length ? (
                <Grid container spacing={1}>
                  {!!field.value?.length &&
                    field.value.map(
                      ({ id, resourceLocation }: DocumentFragment) => (
                        <Grid item key={id}>
                          <Badge
                            badgeContent={
                              <ButtonBase
                                onClick={getDeleteClickHandler(id)}
                                className={classes.deleteButton}
                                aria-label={t('action.delete')}
                              >
                                –
                              </ButtonBase>
                            }
                            overlap="circle"
                            color="error"
                            classes={{ badge: classes.deleteBadge }}
                          >
                            <Box className={classes.previewItem}>
                              <img
                                src={getResizedImageUrl(
                                  resourceLocation,
                                  'avatarMedium'
                                )}
                                alt={t('label.uploadedImage')}
                                className={classes.previewImg}
                              />
                            </Box>
                          </Badge>
                        </Grid>
                      )
                    )}

                  {progress.map(({ name, value }) => (
                    <Grid item key={name}>
                      <Box className={classes.previewItem}>
                        <CircularProgress
                          variant="determinate"
                          size={20}
                          value={value}
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Box className={classes.placeholder}>
                  <IconWrapper icon={BiImageAdd}>
                    <Typography>{label}</Typography>
                  </IconWrapper>
                </Box>
              )}
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
