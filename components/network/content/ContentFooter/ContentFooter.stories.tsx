import { Meta } from '@storybook/react/types-6-0';
import { Container } from '@material-ui/core';

import { ContentFooter } from './ContentFooter';

export default {
  title: 'Content/Partials/ContentFooter',
  decorators: [
    (Story) => (
      <Container maxWidth="sm">
        <Story />
      </Container>
    ),
  ],
} as Meta;

export const Default = () => (
  <ContentFooter
    id="T:123:Article"
    categories={['culture', 'administration', 'environment']}
    location={{ addressCountry: 'Deutschland', addressLocality: 'Leipzig' }}
  />
);
