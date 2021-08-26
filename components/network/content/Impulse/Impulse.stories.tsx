import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { article } from 'testing/data';

import { Impulse } from './Impulse';

export default {
  title: 'Content/View/Impulse',
  component: Impulse,
  args: { data: article },
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default: Story = ({ data }) => <Impulse data={data} />;
Default.storyName = 'Impulse';
