import { submit } from 'testing/util';

export const makeUploadRequest = async (...args: any) => {
  submit('upload', ...args);
  return 'sample/location/123';
};
