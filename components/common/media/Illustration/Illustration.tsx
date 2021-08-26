import { Box, makeStyles } from '@material-ui/core';
import upperFirst from 'lodash/upperFirst';

type Props = {
  /** The name of the illustration */
  name: 'error' | 'personal' | 'whiteboard' | 'wireframe';
};

const useStyles = makeStyles(({}) => ({
  root: {
    width: '100%',
    height: 0,
    paddingBottom: `${(2 / 3) * 100}%`,
    overflow: 'hidden',
  },
  img: {
    width: '100%',
    height: 'auto',
  },
}));

/** Renders one of the custom illustrations used for purely decorational reasons. */
export const Illustration: React.FC<Props> = ({ name }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <img
        src={`/static/illustrations/${name}.svg`}
        alt={upperFirst(name)}
        className={classes.img}
      />
    </Box>
  );
};
