import { messaging } from 'testing/util';

export const useMessagingConnection = () => ({
  initializeMessagingStream: () => messaging.init(),
  closeMessagingStream: () => messaging.close(),
});
