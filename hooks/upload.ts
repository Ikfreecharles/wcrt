import { Dispatch, SetStateAction } from 'react';

import { DocumentFragment, useImageCreateMutation } from 'lib/graphql';
import { makeUploadRequest, UploadProgress } from 'util/upload';

/**
 * Returns a function for creating an image via GraphQL and initiating an upload
 * request afterwards.
 */
export const useImageUpload = (
  setProgress: Dispatch<SetStateAction<UploadProgress[]>>
) => {
  const [createImage] = useImageCreateMutation();

  return async (file: File): Promise<DocumentFragment> => {
    const { data: createResult } = await createImage({
      variables: { name: file.name },
    });

    if (!createResult) throw new Error('Missing mutation response');
    const { created, signedID } = createResult.imageCreate;

    const uploadResult = await makeUploadRequest(
      file,
      `${process.env.NEXT_PUBLIC_FUNCTION_UPLOAD_URL}/image/${signedID}`,
      setProgress
    ).catch((error) => {
      throw new Error(`Upload request failed (${error})`);
    });

    return {
      id: created.id,
      resourceLocation: uploadResult,
    };
  };
};
