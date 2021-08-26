import { useRef } from 'react';
import { ApolloClient, useApolloClient } from '@apollo/client';
import { useSnackbar } from 'notistack';

import { useTranslation } from 'lib/i18n';
import { sendMessageToChannel, createMessagingStream } from 'lib/grpc';
import { useMessagingStatsQuery, useChatChannelQuery } from 'lib/graphql';
import {
  clearMessageCache,
  markChannelAsRead,
  writePreviousMessagesToCache,
  initializeMessagingCache,
  writeMessagingEventToCache,
} from 'util/messaging';

/** Returns common actions for sending and receiving chat messages via GRPC. */
export const useMessaging = (channelId: string) => {
  const { t } = useTranslation();
  const apolloClient = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  const sendMessage = async (content: string) => {
    try {
      return await sendMessageToChannel(channelId, content);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(t('notice.messageSendError'), { variant: 'error' });
    }
  };

  const loadMessages = async (cursor?: string | null) => {
    try {
      return await writePreviousMessagesToCache(
        apolloClient,
        channelId,
        cursor
      );
    } catch (error) {
      console.error(error);
      enqueueSnackbar(t('notice.messagesLoadError'), { variant: 'error' });
    }
  };

  const markMessagesAsRead = async () => {
    try {
      return await markChannelAsRead(apolloClient, channelId);
    } catch (error) {
      console.error(error);
      enqueueSnackbar(t('notice.messagesMarkAsReadError'), {
        variant: 'error',
      });
    }
  };

  const clearMessages = () => clearMessageCache(apolloClient, channelId);

  return { sendMessage, loadMessages, markMessagesAsRead, clearMessages };
};

/**
 * Returns functions to initialize or close a messaging connection via GRPC. New
 * messages will then be send to the Apollo Client.
 */
export const useMessagingConnection = (apolloClient: ApolloClient<unknown>) => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const messagingClient = useRef<ReturnType<
    typeof createMessagingStream
  > | null>();

  const initializeMessagingStream = (isReconnecting = false) => {
    const isReinitializing = messagingClient.current !== undefined;
    if (!isReinitializing) initializeMessagingCache(apolloClient);

    const client = createMessagingStream(
      (headers) => {
        console.log(`Messaging stream established`, headers.headersMap);
        if (
          isReconnecting &&
          (!headers.has('grpc-status') || headers.get('grpc-status')[0] === '0')
        )
          enqueueSnackbar(t('notice.connectionReestablished'), {
            variant: 'success',
          });
      },
      (event) => writeMessagingEventToCache(apolloClient, event),
      (code) => {
        console.log(`Messaging stream closed (${code})`);
        if (!isReconnecting)
          enqueueSnackbar(t('notice.connectionLost'), { variant: 'error' });
        setTimeout(() => {
          console.log('Trying to reconnect …');
          initializeMessagingStream(true);
        }, 5000);
      }
    );

    return (messagingClient.current = client);
  };

  const closeMessagingStream = () => {
    messagingClient.current?.close();
    messagingClient.current = null;
  };

  return { initializeMessagingStream, closeMessagingStream };
};

/** Returns a reactive variable with the number of unread messages for a specific channel. */
export const useMessagingCount = (channelId?: string) => {
  const { data: messagingData } = useMessagingStatsQuery({
    skip: !!channelId,
  });

  const { data: channelData } = useChatChannelQuery({
    skip: !channelId,
    variables: {
      id: channelId!,
    },
  });

  return (
    (channelId
      ? channelData?.chatChannel?.unreadCount
      : messagingData?.messagingStats?.unreadCount) || 0
  );
};
