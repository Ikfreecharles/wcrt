import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { group } from 'testing/data';

import { GroupProfile } from './GroupProfile';

export default {
  title: 'Primary/GroupProfile',
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default: Story = () => <GroupProfile data={group as any} />;
