import { submit } from 'testing/util';

export const useArticleSubmit =
  (id?: string) =>
  async (...args: any) => {
    submit(id || 'article', ...args);
    return id || 'T:123:Article';
  };
