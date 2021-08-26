import { auth, submit, graphqlResponse } from 'testing/util';

export const useProfile = () =>
  auth.session
    ? {
        ...graphqlResponse.accountInfo.me.represents,
        representedBy: {
          id: graphqlResponse.accountInfo.me.id,
          email: graphqlResponse.accountInfo.me.email,
        },
      }
    : undefined;

export const useProfileSubmit =
  () =>
  async (...args: any) =>
    submit('agent', ...args);
