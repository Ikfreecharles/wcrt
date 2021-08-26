import { Meta } from '@storybook/react/types-6-0';
import { Box, Container } from '@material-ui/core';

import { person, persons, comments, topics } from 'testing/data';
import {
  AgentAvatarFragment,
  AgentSignatureFragment,
  CommentFragment,
  TopicTeaserFragment,
} from 'lib/graphql';

import { ContentSidebar } from './ContentSidebar';

export default {
  title: 'Primary/ContentSidebar',
  decorators: [
    (Story) => (
      <Container maxWidth="xs">
        <Box py={2}>
          <Story />
        </Box>
      </Container>
    ),
  ],
} as Meta;

export const Default = () => (
  <ContentSidebar
    id="T:123:Article"
    supporters={persons as AgentAvatarFragment[]}
    supportCount={persons.length}
    comments={comments as CommentFragment[]}
    commentCount={comments.length}
    relatedTopics={topics as TopicTeaserFragment[]}
  />
);

export const Impulse = () => (
  <ContentSidebar
    id="T:123:Article"
    relevance={84}
    impulseAuthor={person as AgentSignatureFragment}
    supporters={persons as AgentAvatarFragment[]}
    supportCount={persons.length}
    relatedTopics={topics as TopicTeaserFragment[]}
  />
);
