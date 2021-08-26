import { Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { comment } from 'testing/data';

import { Comment } from './Comment';

export default {
  title: 'Content/Partials/Comment',
  component: Comment,
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default = () => <Comment data={comment as any} />;

export const Emphasized = () => <Comment emphasized data={comment as any} />;
