import { Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { articles } from 'testing/data';
import { ContentSummaryFragment } from 'lib/graphql';

import { ContentSummaryList } from './ContentSummaryList';

export default {
  title: 'Content/Collection/ContentSummaryList',
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default = () => (
  <ContentSummaryList contents={articles as ContentSummaryFragment[]} />
);

export const Extended = () => (
  <ContentSummaryList
    extended
    contents={articles as ContentSummaryFragment[]}
  />
);
