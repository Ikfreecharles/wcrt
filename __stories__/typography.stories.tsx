import { Meta } from '@storybook/react/types-6-0';
import { Typography } from '@material-ui/core';

export default {
  title: 'Basic/Typography',
} as Meta;

export const H1 = () => <Typography variant="h1">Headline 1</Typography>;
export const H2 = () => <Typography variant="h2">Headline 2</Typography>;
export const H3 = () => <Typography variant="h3">Headline 3</Typography>;
export const H4 = () => <Typography variant="h4">Headline 4</Typography>;
export const H5 = () => <Typography variant="h5">Headline 5</Typography>;
export const H6 = () => <Typography variant="h6">Headline 6</Typography>;

export const Subtitle1 = () => (
  <Typography variant="subtitle1">Subtitle 1</Typography>
);
export const Subtitle2 = () => (
  <Typography variant="subtitle2">Subtitle 2</Typography>
);

export const Body1 = () => (
  <Typography variant="body1">
    Body1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.
  </Typography>
);

export const Body2 = () => (
  <Typography variant="body2">
    Body2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
    cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
    est laborum.
  </Typography>
);

export const Button = () => <Typography variant="button">Button</Typography>;

export const Caption = () => <Typography variant="caption">Caption</Typography>;

export const Overline = () => (
  <Typography variant="overline">Overline</Typography>
);
