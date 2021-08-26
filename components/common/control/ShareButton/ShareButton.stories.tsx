import { Meta } from '@storybook/react/types-6-0';
import { Box } from '@material-ui/core';

import { ShareButton } from './ShareButton';

export default {
  title: 'Secondary/ShareButton',
  decorators: [
    (Story) => (
      <Box p={2}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const Default = () => <ShareButton />;
