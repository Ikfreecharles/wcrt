import { Box, Slide, makeStyles } from '@material-ui/core';
import { EnterHandler } from 'react-transition-group/Transition';
import clsx from 'clsx';

type Props = {
  /** The index of the tab */
  index: number;
  /** The index number of the current tab */
  activeTab: number;
  /** The index number of the previous tab (to determine the transition direction) */
  previousTab?: number;
};

const useStyles = makeStyles(({}) => ({
  transitionContainer: {
    opacity: 0,
    transitionProperty: 'opacity, transform !important',
  },
}));

/** Renders the content of a specific tab and adds an animation for switching between tabs. */
export const TabPanel: React.FC<Props> = ({
  index,
  activeTab,
  previousTab,
  children,
}) => {
  const classes = useStyles();

  const shouldAnimate = typeof previousTab !== 'undefined';

  const handleEntering: EnterHandler<undefined> = (node) => {
    node.style.opacity = '1';
  };

  return (
    <Slide
      in={activeTab === index}
      appear={shouldAnimate}
      direction={previousTab && previousTab > activeTab ? 'right' : 'left'}
      onEntering={handleEntering}
      exit={false}
      unmountOnExit
    >
      <Box className={clsx(shouldAnimate && classes.transitionContainer)}>
        {children}
      </Box>
    </Slide>
  );
};
