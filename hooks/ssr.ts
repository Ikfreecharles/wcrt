import {
  useLayoutEffect as useLayoutEffectReact,
  useEffect as useEffectReact,
} from 'react';

import { isServerSide } from 'util/env';

/** Proxy `useLayoutEffect` to `useEffect` for SSR. */
export const useLayoutEffect = !isServerSide
  ? useLayoutEffectReact
  : useEffectReact;
