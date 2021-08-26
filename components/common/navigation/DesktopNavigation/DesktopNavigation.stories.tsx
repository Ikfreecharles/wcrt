import { Meta } from '@storybook/react/types-6-0';
import { Box, Container } from '@material-ui/core';

import { DesktopNavigation } from './DesktopNavigation';

export default {
  title: 'Primary/DesktopNavigation',
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

export const Default = () => <DesktopNavigation />;
