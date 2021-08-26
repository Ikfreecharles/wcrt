import { isServerSide, isEmbedded } from 'util/env';

/** Redirect non-embedded views when in embedded environment. */
(() => {
  if (!isServerSide) {
    const isAppEmbedded = isEmbedded();
    const isViewEmbedded = window.self !== window.top;

    if (isAppEmbedded && !isViewEmbedded) {
      const redirectBase = process.env.NEXT_PUBLIC_CUSTOM_EMBED_URL;

      if (redirectBase) {
        window.location.replace(
          redirectBase + encodeURIComponent(window.location.pathname)
        );
      }
    }
  }
})();
