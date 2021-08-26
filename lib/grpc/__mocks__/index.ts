import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

import { submit } from 'testing/util';

export const sendMessageToChannel = async (
  channelId: string,
  content: string
) => {
  submit('chatMessage', channelId, content);
  return true;
};

export const writePreviousMessagesToCache = async (
  _client: ApolloClient<NormalizedCacheObject>,
  _channelId: string,
  _cursor: string
) => 'T:456:ChatMessage';

export const markChannelAsRead = async () => true;
