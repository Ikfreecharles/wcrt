import { Meta } from '@storybook/react/types-6-0';
import { Box, Typography } from '@material-ui/core';
import { BiMap } from 'react-icons/bi';

import { IconWrapper } from './IconWrapper';

export default {
  title: 'Secondary/IconWrapper',
  decorators: [
    (Story) => (
      <Box p={2}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const Default = () => (
  <IconWrapper icon={BiMap}>
    <Typography variant="body2">Leipzig, Deutschland</Typography>
  </IconWrapper>
);
