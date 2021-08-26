import { useContext, useEffect, useState } from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { Breakpoint } from '@material-ui/core/styles/createBreakpoints';

import { PageLayout } from 'types';
import { ColumnContext } from 'context/column';
import { TransitionContext } from 'context/transition';
import { useLayoutEffect } from 'hooks/ssr';
import { getWindowDimensions } from 'util/layout';

/** Returns reactive variables that hold the current window width and height. */
export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  const handleResize = () => {
    setWindowDimensions(getWindowDimensions());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
};

/** Proxy of `useState`, that holds the components for the page layout. */
export const usePageLayout = () => {
  const [state, setState] = useState<PageLayout>();

  const setPageLayout = (newState: PageLayout | null) => {
    if (newState === null) setState(undefined);
    else setState((prevState) => ({ ...prevState, ...newState }));
  };

  return [state, setPageLayout] as const;
};

/**
 * A custom `useMediaQuery` implementation that takes the current column width
 * into account.
 */
export function useColumnQuery(): Breakpoint;
export function useColumnQuery(breakpoint: Breakpoint | number): boolean;
export function useColumnQuery(breakpoint?: Breakpoint | number) {
  const { breakpoints } = useTheme();
  const windowDimensions = useWindowDimensions();
  const columnSize = useContext(ColumnContext) / 12;
  const breakpointWidth =
    typeof breakpoint === 'string'
      ? breakpoints.values[breakpoint]
      : breakpoint;

  // Return the active breakpoint if no breakpoint was requested.
  if (typeof breakpoint === 'undefined') {
    const columnWidth = windowDimensions.width * columnSize;
    let activeBreakpoint = 'xs';

    Object.values(breakpoints.values).forEach((breakpointValue, index) => {
      const isReached = columnWidth >= breakpointValue;
      if (isReached) activeBreakpoint = Object.keys(breakpoints.values)[index];
    });

    return activeBreakpoint as Breakpoint;
  }

  return useMediaQuery(breakpoints.up(breakpointWidth! / columnSize));
}

/**
 * Uses the context to register a callback, which fires after the page
 * transition has finished.
 */
export const usePageTransitionCallback = (
  additionalCallback: (() => void) | undefined
) => {
  const { setTransitionCallback } = useContext(TransitionContext);

  useLayoutEffect(() => {
    setTransitionCallback?.((prevCallback) => () => {
      prevCallback?.();
      additionalCallback?.();
    });
  }, []);
};
