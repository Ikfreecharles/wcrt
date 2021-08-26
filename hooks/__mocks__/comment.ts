import { submit } from 'testing/util';

export const useCommentSubmit =
  () =>
  async (...args: any) => {
    submit('comment', ...args);
    return 'T:123:Comment';
  };
