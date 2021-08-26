import { useState } from 'react';
import { Box, Grow } from '@material-ui/core';
import { ExitHandler } from 'react-transition-group/Transition';

import { TransitionProvider } from 'context/transition';

type Props = {
  /** Hide the page content */
  hidden?: boolean;
  /** Action to execute when the transition is finished */
  onHidden?: ExitHandler<HTMLElement>;
};

/**
 * Shows or hides the content of a page with an uniform transition. Provides its
 * child components the ability to fire a transition callback.
 */
export const PageTransition: React.FC<Props> = ({
  hidden,
  onHidden,
  children,
}) => {
  const [transitionCallback, setTransitionCallback] = useState<() => void>();

  return (
    <TransitionProvider value={{ setTransitionCallback }}>
      <Grow
        in={!hidden}
        onExited={onHidden}
        onEntered={transitionCallback}
        style={{ transformOrigin: 'top' }}
      >
        <Box>{children}</Box>
      </Grow>
    </TransitionProvider>
  );
};
