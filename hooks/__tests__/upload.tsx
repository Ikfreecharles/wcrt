import { renderHook, TestingContext, apollo, submit } from 'testing/util';
import { ImageCreateDocument } from 'lib/graphql';
import { useImageUpload } from 'hooks/upload';

jest.mock('util/upload');

describe('useImageUpload', () => {
  const setProgress = jest.fn();
  const sampleFile = new File(['sample'], 'sample.png', { type: 'image/png' });

  beforeAll(() => {
    apollo.response = {
      imageCreate: {
        signedID: 'XYZ',
        created: {
          id: 'T:123:Image',
        },
      },
    };
  });

  test('create image', async () => {
    const { result } = renderHook(() => useImageUpload(setProgress), {
      wrapper: TestingContext,
    });
    await result.current(sampleFile);
    expect(apollo.mutate).toHaveBeenCalledTimes(1);
    expect(apollo.mutate).toHaveBeenCalledWith(ImageCreateDocument, {
      name: 'sample.png',
    });
  });

  test('upload image', async () => {
    const { result } = renderHook(() => useImageUpload(setProgress), {
      wrapper: TestingContext,
    });
    await result.current(sampleFile);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit).toHaveBeenCalledWith(
      'upload',
      sampleFile,
      'https://function.upload.dev.we-create.io/image/XYZ',
      setProgress
    );
  });
});
