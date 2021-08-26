import { createElement, Fragment } from 'react';
import { InitOptions } from 'next-auth';
import NextAuth from 'next-auth/client';

import { isEmbedded } from 'util/env';
import { refreshAccountData, revokeToken } from 'util/server/auth';

/** Our custom configuration for implementing OAuth via `next-auth`. */
export const options: InitOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    {
      id: 'wecreate',
      name: 'WeCreate',
      type: 'oauth',
      version: '2.0',
      scope: 'openid email profile',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: `${process.env.NEXT_PUBLIC_LOGIN_URL}/token`,
      requestTokenUrl: `${process.env.NEXT_PUBLIC_LOGIN_URL}/auth`,
      authorizationUrl: `${process.env.NEXT_PUBLIC_LOGIN_URL}/auth?response_type=code&prompt=login`, // @todo https://github.com/wecreateio/issues/issues/171
      profileUrl: `${process.env.NEXT_PUBLIC_LOGIN_URL}/me`,
      profile: (profile: Record<string, unknown>) => ({
        id: profile.sub,
        name: profile.name,
        email: profile.email,
        image: profile.picture,
      }),
      clientId: process.env.OAUTH_ID,
      clientSecret: process.env.OAUTH_SECRET,
      idToken: false,
      state: false, // @todo https://github.com/nextauthjs/next-auth/issues/1179
    },
  ],
  callbacks: {
    // Store new or refreshed account data in session token.
    jwt: async (token, _user, account) =>
      Promise.resolve({
        ...token,
        account: account || (await refreshAccountData(token.account)),
      }),
    // Extract account info from session token and expose it on client-side.
    session: async (session, token) =>
      Promise.resolve({
        ...session,
        // @ts-ignore (typing considers database sessions only)
        account: token.account,
      }),
  },
  events: {
    signOut: async (token) => {
      await revokeToken(token.account?.accessToken);
    },
  },
  debug: process.env.NODE_ENV !== 'production',
};

/**
 * A custom export of the provider from `next-auth` which is mocked if the
 * environment is embedded.
 */
export const AuthProvider = isEmbedded()
  ? ({ children }: { children: React.ReactNode }) =>
      createElement(Fragment, { children })
  : NextAuth.Provider;

/**
 * A custom export of the session getter from `next-auth` which is mocked if the
 * environment is embedded.
 */
export const getSession = isEmbedded()
  ? () => Promise.resolve(null)
  : NextAuth.getSession;

/**
 * A custom export of the session hook from `next-auth` which is mocked if the
 * environment is embedded.
 */
export const useSession = isEmbedded()
  ? (): [null, boolean] => [null, false]
  : NextAuth.useSession;

/** A custom export of the sign-in function that always uses our own provider. */
export const signIn = () => NextAuth.signIn('wecreate');

/**
 * A custom export of the sign-out function to be extended if we support
 * sign-out federation.
 */
export const signOut = NextAuth.signOut;
