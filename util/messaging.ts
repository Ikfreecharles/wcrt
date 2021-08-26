import { ApolloClient } from '@apollo/client';

import {
  MessagingStatsQuery,
  MessagingStatsDocument,
  ChatChannelQuery,
  ChatChannelDocument,
  ChatMessage,
} from 'lib/graphql';

import {
  getPreviousMessages,
  getUnreadCount,
  setMessageLastRead,
  CallBackEvent,
  Message,
} from 'lib/grpc';
import { mergeUniqueItems } from 'util/cache';

/** Prepares a GRPC event message be used within a GraphQL context. */
const transformChatMessageToGraphql = (message: Message): ChatMessage => ({
  __typename: 'ChatMessage',
  id: message.getMessageId(),
  createdAt: message.getCreatedat()!.toDate(),
  authorId: message.getAuthor()?.getUserId(),
  channelId: message.getChannelId(),
  content: message.getContent(),
});

/** Increments or decrements the global messaging stats on the local state. */
const modifyMessagingStats = (client: ApolloClient<unknown>, increment = 1) => {
  const data = client.readQuery<MessagingStatsQuery>({
    query: MessagingStatsDocument,
  });

  client.writeQuery({
    query: MessagingStatsDocument,
    data: {
      ...data,
      messagingStats: {
        __typename: 'MessagingStats',
        ...data?.messagingStats,
        unreadCount: data?.messagingStats?.unreadCount
          ? data.messagingStats.unreadCount + increment
          : increment,
      },
    },
  });
};

/** Increments or decrements the messaging stats of a specific channel on the local state. */
const modifyChannelStats = (
  client: ApolloClient<unknown>,
  channelId: string,
  increment = 1
) => {
  const data = client.readQuery<ChatChannelQuery>({
    query: ChatChannelDocument,
    variables: { id: channelId },
  });

  client.writeQuery({
    query: ChatChannelDocument,
    variables: { id: channelId },
    data: {
      ...data,
      chatChannel: {
        __typename: 'ChatChannel',
        id: channelId,
        messages: null,
        ...data?.chatChannel,
        unreadCount: data?.chatChannel?.unreadCount
          ? data.chatChannel.unreadCount + increment
          : increment,
        newCount: data?.chatChannel?.newCount
          ? data.chatChannel.newCount + increment
          : increment,
      },
    },
  });
};

/** Writes a new message to a specific channel on the local state. */
const addMessageToChannel = (
  client: ApolloClient<unknown>,
  channelId: string,
  messages?: Message[],
  addToTop = false
) => {
  const newChannelMessages = messages?.map(transformChatMessageToGraphql);

  const data = client.readQuery<ChatChannelQuery>({
    query: ChatChannelDocument,
    variables: { id: channelId },
  });

  let channelMessages: ChatMessage[] = data?.chatChannel?.messages || [];

  if (newChannelMessages) {
    if (addToTop) {
      channelMessages = mergeUniqueItems([
        ...newChannelMessages,
        ...channelMessages,
      ]);
    } else {
      channelMessages = mergeUniqueItems([
        ...channelMessages,
        ...newChannelMessages,
      ]);
    }
  }

  client.writeQuery({
    query: ChatChannelDocument,
    variables: { id: channelId },
    data: {
      ...data,
      chatChannel: {
        __typename: 'ChatChannel',
        id: channelId,
        unreadCount: 0,
        newCount: 0,
        ...data?.chatChannel,
        messages: channelMessages,
      },
    },
  });
};

/** Initialize the local state by requesting the unread messages count. */
export const initializeMessagingCache = async (
  client: ApolloClient<unknown>
) => {
  const unreadCount = await getUnreadCount();
  let totalCount = 0;

  unreadCount?.getChannelsList().forEach((item) => {
    modifyChannelStats(client, item.getChannelId(), item.getCount());

    totalCount = totalCount + item.getCount();
  });

  modifyMessagingStats(client, totalCount);
};

/** Writes older messages to a specific channel on the local state. */
export const writePreviousMessagesToCache = async (
  client: ApolloClient<unknown>,
  channelId: string,
  cursor?: string | null
) => {
  const response = await getPreviousMessages(channelId, cursor);
  const hasNext = response?.getHasnextpage();
  const newMessages = response?.getMessagesList().reverse();

  addMessageToChannel(client, channelId, newMessages, true);

  return newMessages?.length && hasNext ? newMessages[0].getMessageId() : null;
};

/** Evaluates a messaging event and writes a new message to the local state. */
export const writeMessagingEventToCache = (
  client: ApolloClient<unknown>,
  event: CallBackEvent
) => {
  if (event.hasMessagecreated()) {
    const messageFromEvent = event.getMessagecreated()?.getMessage();
    if (!messageFromEvent) throw new Error('Missing message from event');

    modifyMessagingStats(client);
    modifyChannelStats(client, messageFromEvent.getChannelId());
    addMessageToChannel(client, messageFromEvent.getChannelId(), [
      messageFromEvent,
    ]);
  }
};

/** Clears the messages of a specific channel to prevent local state overloads. */
export const clearMessageCache = (
  client: ApolloClient<unknown>,
  channelId: string
) => {
  const data = client.readQuery<ChatChannelQuery>({
    query: ChatChannelDocument,
    variables: { id: channelId },
  });

  client.writeQuery({
    query: ChatChannelDocument,
    variables: { id: channelId },
    data: {
      ...data,
      chatChannel: {
        __typename: 'ChatChannel',
        id: channelId,
        unreadCount: 0,
        ...data?.chatChannel,
        newCount: 0,
        messages: null,
      },
    },
  });

  client.cache.gc();
};

/** Mark all messages of a specific channel as read on the local state. */
export const markChannelAsRead = async (
  client: ApolloClient<unknown>,
  channelId: string
) => {
  const data = client.readQuery<ChatChannelQuery>({
    query: ChatChannelDocument,
    variables: { id: channelId },
  });

  const unreadCount = data?.chatChannel?.unreadCount || null;
  const lastMessage = data?.chatChannel?.messages
    ? data.chatChannel.messages[data.chatChannel.messages.length - 1]
    : null;

  client.writeQuery({
    query: ChatChannelDocument,
    variables: { id: channelId },
    data: {
      ...data,
      chatChannel: {
        __typename: 'ChatChannel',
        id: channelId,
        newCount: 0,
        messages: null,
        ...data?.chatChannel,
        unreadCount: 0,
      },
    },
  });

  if (unreadCount) modifyMessagingStats(client, -unreadCount);
  if (lastMessage) await setMessageLastRead(channelId, lastMessage.id);
};
