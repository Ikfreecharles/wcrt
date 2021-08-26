import { Meta } from '@storybook/react/types-6-0';
import { Box } from '@material-ui/core';
import { BiGhost } from 'react-icons/bi';

import { ActionDisplay } from './ActionDisplay';

export default {
  title: 'Secondary/ActionDisplay',
  decorators: [
    (Story) => (
      <Box p={2}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const Default = () => (
  <ActionDisplay
    icon={BiGhost}
    text="Sample text"
    buttonLabel="Sample button"
    buttonOnClick={() => {
      // trigger action
    }}
  />
);

export const Disabled = () => (
  <ActionDisplay
    icon={BiGhost}
    text="Sample text"
    buttonLabel="Sample button"
    banner="Coming soon"
  />
);
