import { Meta } from '@storybook/react/types-6-0';
import { Box } from '@material-ui/core';

import { Logo } from './Logo';

export default {
  title: 'Secondary/Logo',
  decorators: [
    (Story) => (
      <Box p={2}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const Default = () => <Logo />;
