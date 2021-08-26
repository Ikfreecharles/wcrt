import { MOBILE_NAV_HEIGHT } from 'lib/constants';
import { isEmbedded, isServerSide } from 'util/env';

/** Returns the current width and height of the window. */
export const getWindowDimensions = () => {
  if (isServerSide) return { width: 0, height: 0 };
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

/** Returns the value to use as the position offset to dodge the mobile navigation. */
export const calcMobileNavOffset = (add: number, fallback = false) => {
  const elementHeight = isEmbedded() ? 0 : MOBILE_NAV_HEIGHT;
  const offset = elementHeight + add;

  if (fallback) return offset;

  return `calc(${offset}px + env(safe-area-inset-bottom))`;
};
