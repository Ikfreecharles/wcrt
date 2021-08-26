import { Dispatch, SetStateAction } from 'react';

import { accessTokenVar } from 'lib/variables';

/** An object to communicate the upload progress. */
export type UploadProgress = {
  /** The file name */
  name: string;
  /** The upload progress as percentage */
  value: number;
};

/**
 * Start an upload request for a given file to a specific URL while
 * communicating the progress via callback.
 */
export const makeUploadRequest = (
  file: File,
  url: string,
  setProgress?: Dispatch<SetStateAction<UploadProgress[]>>
) =>
  new Promise<string>((resolve, reject) => {
    const accessToken = accessTokenVar();
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append('metadata', `{ "name": "${file.name}" }`);
    formData.append('media', file);

    if (setProgress)
      xhr.upload.addEventListener('progress', ({ total, loaded }) => {
        setProgress((prevState) => [
          { name: file.name, value: (loaded / total) * 100 },
          ...prevState.filter((item) => item.name !== file.name),
        ]);
      });

    xhr.upload.addEventListener('error', () => {
      reject('network error');
    });

    xhr.addEventListener('load', () => {
      try {
        const { resourceLocation } = JSON.parse(xhr.responseText);
        if (!resourceLocation) reject('missing expected response');
        resolve(resourceLocation);
      } catch {
        reject(xhr.responseText.trim());
      }
    });

    xhr.open('POST', url);

    if (accessToken)
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);

    xhr.send(formData);
  });
