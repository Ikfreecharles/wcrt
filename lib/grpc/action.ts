import { grpc } from '@improbable-eng/grpc-web';
import { BoolValue } from 'google-protobuf/google/protobuf/wrappers_pb';

import { accessTokenVar } from 'lib/variables';

import {
  MessageSendRequest,
  MessagesLoadResponse,
  MessageGetUnreadCountResponse,
  MessagesLoadRequest,
  MessageSetLastReadRequest,
} from './generated/action/message_pb';
import {
  ChatService,
  ChatServiceMessageGetUnreadCount,
  ChatServiceMessageSend,
  ChatServiceMessageSetLastRead,
  ChatServiceMessagesLoad,
} from './generated/action/action_pb_service';
import { Message } from './generated/object/message_pb';
import { Pagination } from './generated/action/shared_pb';

/** Always add those fields to unary requests. */
const getSharedUnaryFields = () => ({
  host: process.env.NEXT_PUBLIC_MESSAGING_URL!,
  metadata: {
    Authorization: `Bearer ${accessTokenVar()}`,
  },
});

/** Send a new message to a specific channel. */
export const sendMessageToChannel = (channelId: string, content: string) =>
  new Promise<Message | null>((resolve, reject) => {
    const request = new MessageSendRequest();
    request.setChannelId(channelId);
    request.setContent(content);

    grpc.unary<MessageSendRequest, Message, ChatServiceMessageSend>(
      ChatService.MessageSend,
      {
        request,
        ...getSharedUnaryFields(),
        onEnd: (response) =>
          response.status
            ? reject(response.statusMessage)
            : resolve(response.message),
      }
    );
  });

/** Get the number of unread messages for all channels. */
export const getUnreadCount = () =>
  new Promise<MessageGetUnreadCountResponse | null>((resolve, reject) => {
    grpc.unary<
      BoolValue,
      MessageGetUnreadCountResponse,
      ChatServiceMessageGetUnreadCount
    >(ChatService.MessageGetUnreadCount, {
      request: new BoolValue(),
      ...getSharedUnaryFields(),
      onEnd: (response) =>
        response.status
          ? reject(response.statusMessage)
          : resolve(response.message),
    });
  });

/** Get messages for a specific channel. */
export const getPreviousMessages = (
  channelId: string,
  cursor?: string | null
) =>
  new Promise<MessagesLoadResponse | null>((resolve, reject) => {
    const pagination = new Pagination();
    pagination.setDirection(0);
    if (cursor) pagination.setCursor(cursor);

    const request = new MessagesLoadRequest();
    request.setChannelId(channelId);
    request.setPagination(pagination);

    grpc.unary<
      MessagesLoadRequest,
      MessagesLoadResponse,
      ChatServiceMessagesLoad
    >(ChatService.MessagesLoad, {
      request,
      ...getSharedUnaryFields(),
      onEnd: (response) =>
        response.status
          ? reject(response.statusMessage)
          : resolve(response.message),
    });
  });

/** Mark all messages from a specific channel as read. */
export const setMessageLastRead = (channelId: string, messageId: string) =>
  new Promise<BoolValue | null>((resolve, reject) => {
    const request = new MessageSetLastReadRequest();
    request.setChannelId(channelId);
    request.setMessageId(messageId);

    grpc.unary<
      MessageSetLastReadRequest,
      BoolValue,
      ChatServiceMessageSetLastRead
    >(ChatService.MessageSetLastRead, {
      request,
      ...getSharedUnaryFields(),
      onEnd: (response) =>
        response.status
          ? reject(response.statusMessage)
          : resolve(response.message),
    });
  });
