import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { ContentHeader } from './ContentHeader';

export default {
  title: 'Content/Partials/ContentHeader',
  decorators: [
    (Story) => (
      <Container maxWidth="xs">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default: Story = () => (
  <ContentHeader id="T:123:Article" label="Article" timestamp={new Date()} />
);
