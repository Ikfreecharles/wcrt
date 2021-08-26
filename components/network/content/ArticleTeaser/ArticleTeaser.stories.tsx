import { Story, Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { article } from 'testing/data';

import { ArticleTeaser } from './ArticleTeaser';

export default {
  title: 'Content/Teaser/ArticleTeaser',
  component: ArticleTeaser,
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default: Story = () => <ArticleTeaser data={article as any} />;
