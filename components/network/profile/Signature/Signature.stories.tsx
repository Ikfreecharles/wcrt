import { Meta } from '@storybook/react/types-6-0';
import { Box } from '@material-ui/core';

import { person } from 'testing/data';

import { Signature } from './Signature';

export default {
  title: 'Secondary/Signature',
  decorators: [
    (Story) => (
      <Box p={2}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const Default = () => <Signature data={person} />;

export const Compact = () => <Signature compact data={person} />;
