import { Meta } from '@storybook/react/types-6-0';
import { Box } from '@material-ui/core';

import { Alert } from './Alert';

export default {
  title: 'Primary/Alert',
  decorators: [
    (Story) => (
      <Box p={2}>
        <Story />
      </Box>
    ),
  ],
} as Meta;

export const Error = () => <Alert type="error" />;

export const RemoteError = () => (
  <Alert type="remoteError" info="Error message from server." />
);

export const NotFound = () => <Alert type="notFound" />;

export const MessageSent = () => (
  <Alert
    type="messageSent"
    onClick={() => {
      // close function
    }}
  />
);
