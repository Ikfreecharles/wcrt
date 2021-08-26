import { createContext } from 'react';

import { getFeatureFlags, FeatureFlags } from 'util/feature';

/** Shares the currently activated features between the app and the components. */
export const FeatureContext = createContext<FeatureFlags>(
  Object.keys(getFeatureFlags()).reduce(
    (data, key) => ({
      ...data,
      [key]: true,
    }),
    {} as FeatureFlags
  )
);

export const FeatureProvider = FeatureContext.Provider;
