import { CommonInputProps } from 'types';

/** Returns a `react-hook-form` validator for list inputs. */
export const getListValidation =
  (rules: CommonInputProps['rules']) => (values: unknown[] | undefined) => {
    // Required lists should contain at least one item.
    if (rules?.required && (!values || values.length < 1)) return false;

    // Validate the minimum length if specified.
    if (
      typeof rules?.minLength === 'number' &&
      (!values || values.length < rules.minLength)
    )
      return false;

    // Validate the maximum length if specified.
    if (
      typeof rules?.maxLength === 'number' &&
      values &&
      values.length > rules.maxLength
    )
      return false;

    return true;
  };

/** Validates the resolution of an image file against a maximum number of pixels. */
export const imageResolutionValidation = (
  file: File,
  maxPixels: number
): Promise<boolean> =>
  new Promise((resolve) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      const image = new Image();

      image.addEventListener('load', () => {
        const maxPixelsExceeded = image.width * image.height > maxPixels;
        resolve(!maxPixelsExceeded);
      });

      if (typeof reader.result === 'string') image.src = reader.result;
    });

    reader.readAsDataURL(file);
  });
