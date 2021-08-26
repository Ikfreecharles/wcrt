import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { article } from 'testing/data';

import { Article } from './Article';

export default {
  title: 'Content/View/Article',
  component: Article,
  args: { data: article },
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default: Story = ({ data }) => <Article data={data} />;
Default.storyName = 'Article';
