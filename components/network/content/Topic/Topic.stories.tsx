import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { topic } from 'testing/data';

import { Topic } from './Topic';

export default {
  title: 'Content/View/Topic',
  component: Topic,
  args: { data: topic },
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default: Story = ({ data }) => <Topic data={data} />;
Default.storyName = 'Topic';
