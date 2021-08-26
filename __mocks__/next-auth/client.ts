import { createContext } from 'react';

import { auth } from 'testing/util';

export default {
  Provider: createContext(auth.session).Provider,
  useSession: () => [auth.session, false],
  signIn: auth.signIn,
  signOut: auth.signOut,
};
