import { createContext, Dispatch, SetStateAction } from 'react';

/**
 * Shares the ability to set a callback, which fires when the transition of the
 * parent component finishes.
 */
export const TransitionContext = createContext<{
  setTransitionCallback?: Dispatch<SetStateAction<(() => void) | undefined>>;
}>({});

export const TransitionProvider = TransitionContext.Provider;
