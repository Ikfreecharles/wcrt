import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { topics } from 'testing/data';
import { TopicTeaserFragment } from 'lib/graphql';

import { TopicCarousel } from './TopicCarousel';

export default {
  title: 'Content/Collection/TopicCarousel',
  component: TopicCarousel,
  decorators: [
    (Story) => (
      <Container maxWidth="xs">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default: Story = () => (
  <TopicCarousel
    topics={[...topics, ...topics, ...topics] as TopicTeaserFragment[]}
  />
);
