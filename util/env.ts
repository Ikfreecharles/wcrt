/** Checks if running on the server side. */
export const isServerSide = typeof window === 'undefined';

/** Checks if running in embedded mode (i.e. as iframe). */
export const isEmbedded = (key?: string) =>
  key
    ? process.env.NEXT_PUBLIC_CUSTOM_EMBED === key
    : !!process.env.NEXT_PUBLIC_CUSTOM_EMBED;

/** Converts an environment variable to a boolean. */
export const isTrueEnv = (envVar?: string) =>
  envVar?.toLowerCase() === 'true' ? true : false;
