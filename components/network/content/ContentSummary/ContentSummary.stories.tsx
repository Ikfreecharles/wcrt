import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { article } from 'testing/data';

import { ContentSummary } from './ContentSummary';

export default {
  title: 'Content/Partials/ContentSummary',
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default: Story = () => <ContentSummary data={article as any} />;

export const Extended: Story = () => (
  <ContentSummary extended data={article as any} />
);
