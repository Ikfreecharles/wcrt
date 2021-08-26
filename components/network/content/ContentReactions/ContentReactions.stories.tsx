import { Story, Meta } from '@storybook/react/types-6-0';

import { ContentReactions } from './ContentReactions';

export default {
  title: 'Content/Partials/ContentReactions',
} as Meta;

export const Default: Story = () => (
  <ContentReactions id="T:123:Article" supportCount={16} commentCount={4} />
);

export const Small: Story = () => (
  <ContentReactions
    id="T:123:Article"
    supportCount={16}
    commentCount={4}
    size="small"
  />
);
