import { useContext } from 'react';

import { FeatureFlags } from 'util/feature';
import { FeatureContext } from 'context/feature';

type Props = {
  /** The main feature flag */
  flag: keyof FeatureFlags;
  /** An addtional feature flag to check */
  and?: keyof FeatureFlags;
  /** An alternative feature flag to check */
  or?: keyof FeatureFlags;
  /** Alternative content to render when the children are hidden */
  placeholder?: React.ReactNode;
};

/** Shows or hides its children based on feature flags. */
export const Feature: React.FC<Props> = ({
  flag,
  and,
  or,
  placeholder,
  children,
}) => {
  const features = useContext(FeatureContext);

  const isKnown =
    (features.hasOwnProperty(flag) && (!and || features.hasOwnProperty(and))) ||
    (or && features.hasOwnProperty(or));

  const isActive =
    isKnown &&
    ((features[flag] && (!and || features[and])) || (or && features[or]));

  return isActive ? <>{children}</> : <>{placeholder}</>;
};
