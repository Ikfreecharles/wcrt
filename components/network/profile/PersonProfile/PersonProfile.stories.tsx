import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { person } from 'testing/data';

import { PersonProfile } from './PersonProfile';

export default {
  title: 'Primary/PersonProfile',
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default: Story = () => <PersonProfile data={person as any} />;
