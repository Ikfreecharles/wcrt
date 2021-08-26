import { Meta } from '@storybook/react/types-6-0';
import { Box } from '@material-ui/core';
import { BiGhost } from 'react-icons/bi';

import { IconDisplay } from './IconDisplay';

export default {
  title: 'Secondary/IconDisplay',
  decorators: [
    (Story) => (
      <Box p={2}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const Default = () => <IconDisplay icon={BiGhost} />;
