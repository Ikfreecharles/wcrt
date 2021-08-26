import { Meta } from '@storybook/react/types-6-0';
import { Box, Container } from '@material-ui/core';

import { Footer } from './Footer';

export default {
  title: 'Primary/Footer',
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

export const Default = () => <Footer />;
