import { isTrueEnv } from 'util/env';

/**
 * Maps general feature toggles from environment variables to more specific
 * feature decisions.
 */
const getFeatureMap = () => ({
  showGlobalSearchInput: process.env.NEXT_PUBLIC_FEATURE_SEARCH,
  showGlobalSearchPage: process.env.NEXT_PUBLIC_FEATURE_SEARCH,
  showSubscribeButton: process.env.NEXT_PUBLIC_FEATURE_NOTIFICATION,
});

/** The complete feature flags with their boolean state. */
export type FeatureFlags = Record<
  keyof ReturnType<typeof getFeatureMap>,
  boolean
>;

/** Returns all feature decisions as actual feature flags. */
export const getFeatureFlags = () => {
  const featureMap = getFeatureMap();

  return (Object.keys(featureMap) as (keyof FeatureFlags)[]).reduce(
    (data, key) => ({ ...data, [key]: isTrueEnv(featureMap[key]) }),
    {} as FeatureFlags
  );
};

/** Evaluates a single feature flag. */
export const evalFeatureFlag = (key: keyof FeatureFlags) =>
  isTrueEnv(getFeatureMap()[key]);
