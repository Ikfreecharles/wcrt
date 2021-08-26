import { Meta } from '@storybook/react/types-6-0';
import { Box } from '@material-ui/core';

import { newPerson } from 'testing/data';
import { AgentAvatarFragment } from 'lib/graphql';

import { AvatarList } from './AvatarList';

export default {
  title: 'Primary/AvatarList',
  decorators: [
    (Story) => (
      <Box p={2}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

const persons: AgentAvatarFragment[] = [];
for (let i = 0; i < 8; i++) {
  persons.push(newPerson());
}

export const Default = () => <AvatarList items={persons} />;

export const Compact = () => (
  <AvatarList compact items={persons} maxItems={5} />
);
