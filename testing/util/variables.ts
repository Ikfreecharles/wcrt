import { InMemoryCache } from '@apollo/client/core';

import { FormStatus, FormResult, Settings } from 'types';

export const routerBack = jest.fn();
export const routerPush = jest.fn();
export const routerReplace = jest.fn();

export const settings: {
  state: Partial<Settings>;
  setState: () => void;
} = {
  state: {
    language: 'en',
    paletteType: 'light',
    headerState: 'expanded',
  },
  setState: jest.fn(),
};

export const readSettingsFromCookies = jest.fn();
export const writeSettingsToCookies = jest.fn();

export const formStatus: {
  formStatus: FormStatus;
  formResult: FormResult;
  setFormStatus: () => void;
  setFormResult: () => void;
} = {
  formStatus: undefined,
  formResult: undefined,
  setFormStatus: jest.fn(),
  setFormResult: jest.fn(),
};

export const apollo = {
  cache: new InMemoryCache(),
  lazyQuery: jest.fn(),
  mutate: jest.fn(),
  refetch: jest.fn(),
  response: {} as any,
};

export const auth: {
  session: unknown;
  signIn: () => void;
  signOut: () => void;
  getActiveSession: () => unknown;
} = {
  session: null,
  signIn: jest.fn(() => Promise.resolve()),
  signOut: jest.fn(() => Promise.resolve()),
  getActiveSession: () => ({
    user: {
      name: 'Sample user',
    },
    account: {
      id: 'T:123:OnlineAccount',
      accessToken: 'xyz',
    },
  }),
};

export const contentState = {
  subscribed: false,
  supported: false,
  commented: false,
};

export const groupContext = {
  groupId: 'T:123:Group',
  groupName: 'Sample group',
  viewerRole: 'member',
  chatChannel: 'T:123:ChatChannel',
};

export const submit = jest.fn();

export const enqueueSnackbar = jest.fn();
export const closeSnackbar = jest.fn();

export const fetchData: any = {};

export const messaging = {
  init: jest.fn(),
  close: jest.fn(),
};
