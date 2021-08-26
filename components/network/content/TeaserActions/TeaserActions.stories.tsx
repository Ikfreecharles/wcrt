import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { TeaserActions } from './TeaserActions';

export default {
  title: 'Content/Partials/TeaserActions',
  decorators: [
    (Story) => (
      <Container maxWidth="xs">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default: Story = () => (
  <TeaserActions
    id="T:123:Article"
    supportCount={16}
    commentCount={4}
    buttonText="Sample link"
  />
);
