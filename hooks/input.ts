import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FileError, useDropzone } from 'react-dropzone';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import { useImageUpload } from 'hooks/upload';
import { UploadProgress } from 'util/upload';
import { imageResolutionValidation } from 'util/validation';

type CustomError = {
  code: 'generic' | 'invalidType' | 'tooLarge' | 'tooMany';
} | null;

/**
 * Returns drop zone properties of `react-dropzone` and a progress state used to
 * provide a file upload component.
 */
export const useFileInputProps = (
  useUpload: typeof useImageUpload,
  {
    name,
    maxLength = Infinity,
    maxSize = Infinity,
    accept,
    customValidator,
    use,
  }: {
    name: string;
    maxLength?: number;
    maxSize?: number;
    accept?: string[];
    customValidator?: (file: File) => Promise<CustomError>;
    use: UseFormReturn;
  }
) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState<UploadProgress[]>([]);
  const upload = useUpload(setProgress);
  const { enqueueSnackbar } = useSnackbar();
  const dropZoneResult = useDropzone({
    disabled: use.formState.isSubmitting,
    multiple: maxLength > 1,
    maxSize,
    accept,
    onDrop: async (newFiles) => {
      const currentFiles = use.getValues(name);
      const validNewFiles: typeof newFiles = [];

      for (const file of newFiles) {
        const customError = await customValidator?.(file);

        if (customError) {
          enqueueSnackbar(t(`notice.uploadError.${customError.code}`), {
            variant: 'error',
          });
        } else {
          validNewFiles.push(file);
        }
      }

      if (!validNewFiles.length) return;

      if (
        maxLength > 1 &&
        currentFiles &&
        currentFiles.length + validNewFiles.length > maxLength
      )
        return enqueueSnackbar(t('notice.uploadError.tooMany'), {
          variant: 'error',
        });

      setProgress(validNewFiles.map(({ name }) => ({ name, value: 0 })));

      try {
        for (const file of validNewFiles) {
          const currentFiles = use.getValues(name);
          const newFile = await upload(file);

          if (maxLength === 1) {
            use.setValue(name, newFile);
          } else {
            use.setValue(name, [...currentFiles, newFile]);
          }

          setProgress((prevState) => [
            ...prevState.filter((item) => item.name !== file.name),
          ]);
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar(t('notice.uploadError.generic'), { variant: 'error' });
      }

      setProgress([]);
    },
    onDropRejected: (rejections) => {
      const checkErrorCode = (errorCode: FileError['code']) =>
        rejections.some(({ errors }) =>
          errors.some(({ code }) => code === errorCode)
        );
      if (checkErrorCode('file-invalid-type'))
        return enqueueSnackbar(t('notice.uploadError.invalidType'), {
          variant: 'error',
        });
      if (checkErrorCode('file-too-large'))
        return enqueueSnackbar(t('notice.uploadError.tooLarge'), {
          variant: 'error',
        });
    },
  });

  return { ...dropZoneResult, progress };
};

/** A preconfigured proxy of `useFileInputProps` used for image upload components. */
export const useImageInputProps = (
  options: Omit<
    Parameters<typeof useFileInputProps>[1],
    'maxSize' | 'accept' | 'customValidator'
  >
) =>
  useFileInputProps(useImageUpload, {
    ...options,
    maxSize: 5000000, // 5 MB
    accept: ['image/jpeg', 'image/png'],
    customValidator: async (file) =>
      (await imageResolutionValidation(file, 75000000))
        ? null
        : { code: 'tooLarge' },
  });
