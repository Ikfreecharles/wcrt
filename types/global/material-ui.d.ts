import { CSSProperties } from '@material-ui/core/styles/withStyles';

/** Add custom mixins to the Material UI types. */
declare module '@material-ui/core/styles/createMixins' {
  interface Mixins {
    truncateText: CSSProperties;
  }
}

export {};
