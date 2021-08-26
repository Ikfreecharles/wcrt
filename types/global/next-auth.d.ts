/** Define which information the session should hold. */
declare module 'next-auth/client' {
  interface Session {
    user: {
      name: string;
      email: string;
      image: string;
    };
    account: {
      provider: string;
      type: string;
      id: string;
      accessToken: string;
      refreshToken: string;
    };
    expires: string;
  }
}

export {};
