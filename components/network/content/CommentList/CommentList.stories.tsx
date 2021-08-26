import { Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { comments } from 'testing/data';
import { CommentFragment } from 'lib/graphql';

import { CommentList } from './CommentList';

export default {
  title: 'Content/Collection/CommentList',
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default = () => (
  <CommentList comments={comments as CommentFragment[]} />
);

export const Emphasized = () => (
  <CommentList emphasized comments={comments as CommentFragment[]} />
);
