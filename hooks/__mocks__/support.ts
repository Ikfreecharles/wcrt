import { contentState, submit } from 'testing/util';

export const useSupport = (contentId: string) => ({
  toggleSupport: () =>
    contentState.supported
      ? submit('unsupport', contentId)
      : submit('support', contentId),
});
