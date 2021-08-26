import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { topic } from 'testing/data';

import { TopicTeaser } from './TopicTeaser';

export default {
  title: 'Content/Teaser/TopicTeaser',
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default: Story = () => <TopicTeaser data={topic as any} />;
