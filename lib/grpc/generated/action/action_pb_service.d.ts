// package: action
// file: action/action.proto

import * as action_action_pb from "../action/action_pb";
import * as object_channel_pb from "../object/channel_pb";
import * as object_message_pb from "../object/message_pb";
import * as action_channel_pb from "../action/channel_pb";
import * as action_message_pb from "../action/message_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";
import {grpc} from "@improbable-eng/grpc-web";

type ChatServiceMessageSetLastRead = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_message_pb.MessageSetLastReadRequest;
  readonly responseType: typeof google_protobuf_wrappers_pb.BoolValue;
};

type ChatServiceMessagesLoadSinceLastRead = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_message_pb.MessagesLoadSinceLastReadRequest;
  readonly responseType: typeof action_message_pb.MessagesLoadResponse;
};

type ChatServiceMessagesLoadForCurrentUnread = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_message_pb.MessagesLoadForCurrentUnreadRequest;
  readonly responseType: typeof action_message_pb.MessagesLoadResponse;
};

type ChatServiceMessagesLoad = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_message_pb.MessagesLoadRequest;
  readonly responseType: typeof action_message_pb.MessagesLoadResponse;
};

type ChatServiceMessagesLoadChildren = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_message_pb.MessagesLoadChildrenRequest;
  readonly responseType: typeof action_message_pb.MessagesLoadResponse;
};

type ChatServiceMessageGetUnreadCount = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_wrappers_pb.BoolValue;
  readonly responseType: typeof action_message_pb.MessageGetUnreadCountResponse;
};

type ChatServiceMessageLoad = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_message_pb.MessageLoadRequest;
  readonly responseType: typeof action_message_pb.MessageLoadResponse;
};

type ChatServiceChannelCreate = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_channel_pb.ChannelCreateRequest;
  readonly responseType: typeof object_channel_pb.Channel;
};

type ChatServiceChannelDelete = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_channel_pb.ChannelDeleteRequest;
  readonly responseType: typeof google_protobuf_wrappers_pb.BoolValue;
};

type ChatServiceChannelJoin = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_channel_pb.ChannelJoinRequest;
  readonly responseType: typeof google_protobuf_wrappers_pb.BoolValue;
};

type ChatServiceChannelLeave = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_channel_pb.ChannelLeaveRequest;
  readonly responseType: typeof google_protobuf_wrappers_pb.BoolValue;
};

type ChatServiceChannelGetUsers = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_channel_pb.ChannelGetUsersRequest;
  readonly responseType: typeof action_channel_pb.ChannelGetUsersResponse;
};

type ChatServiceUserGetChannels = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof google_protobuf_wrappers_pb.BoolValue;
  readonly responseType: typeof action_channel_pb.UserGetChannelsResponse;
};

type ChatServiceMessageSend = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_message_pb.MessageSendRequest;
  readonly responseType: typeof object_message_pb.Message;
};

type ChatServiceMessageDelete = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_message_pb.MessageDeleteRequest;
  readonly responseType: typeof google_protobuf_wrappers_pb.BoolValue;
};

type ChatServiceChildMessageDelete = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: false;
  readonly requestType: typeof action_message_pb.ChildMessageDeleteRequest;
  readonly responseType: typeof google_protobuf_wrappers_pb.BoolValue;
};

type ChatServiceCallBackEvents = {
  readonly methodName: string;
  readonly service: typeof ChatService;
  readonly requestStream: false;
  readonly responseStream: true;
  readonly requestType: typeof google_protobuf_wrappers_pb.BoolValue;
  readonly responseType: typeof action_action_pb.CallBackEvent;
};

export class ChatService {
  static readonly serviceName: string;
  static readonly MessageSetLastRead: ChatServiceMessageSetLastRead;
  static readonly MessagesLoadSinceLastRead: ChatServiceMessagesLoadSinceLastRead;
  static readonly MessagesLoadForCurrentUnread: ChatServiceMessagesLoadForCurrentUnread;
  static readonly MessagesLoad: ChatServiceMessagesLoad;
  static readonly MessagesLoadChildren: ChatServiceMessagesLoadChildren;
  static readonly MessageGetUnreadCount: ChatServiceMessageGetUnreadCount;
  static readonly MessageLoad: ChatServiceMessageLoad;
  static readonly ChannelCreate: ChatServiceChannelCreate;
  static readonly ChannelDelete: ChatServiceChannelDelete;
  static readonly ChannelJoin: ChatServiceChannelJoin;
  static readonly ChannelLeave: ChatServiceChannelLeave;
  static readonly ChannelGetUsers: ChatServiceChannelGetUsers;
  static readonly UserGetChannels: ChatServiceUserGetChannels;
  static readonly MessageSend: ChatServiceMessageSend;
  static readonly MessageDelete: ChatServiceMessageDelete;
  static readonly ChildMessageDelete: ChatServiceChildMessageDelete;
  static readonly CallBackEvents: ChatServiceCallBackEvents;
}

export type ServiceError = { message: string, code: number; metadata: grpc.Metadata }
export type Status = { details: string, code: number; metadata: grpc.Metadata }

interface UnaryResponse {
  cancel(): void;
}
interface ResponseStream<T> {
  cancel(): void;
  on(type: 'data', handler: (message: T) => void): ResponseStream<T>;
  on(type: 'end', handler: (status?: Status) => void): ResponseStream<T>;
  on(type: 'status', handler: (status: Status) => void): ResponseStream<T>;
}
interface RequestStream<T> {
  write(message: T): RequestStream<T>;
  end(): void;
  cancel(): void;
  on(type: 'end', handler: (status?: Status) => void): RequestStream<T>;
  on(type: 'status', handler: (status: Status) => void): RequestStream<T>;
}
interface BidirectionalStream<ReqT, ResT> {
  write(message: ReqT): BidirectionalStream<ReqT, ResT>;
  end(): void;
  cancel(): void;
  on(type: 'data', handler: (message: ResT) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'end', handler: (status?: Status) => void): BidirectionalStream<ReqT, ResT>;
  on(type: 'status', handler: (status: Status) => void): BidirectionalStream<ReqT, ResT>;
}

export class ChatServiceClient {
  readonly serviceHost: string;

  constructor(serviceHost: string, options?: grpc.RpcOptions);
  messageSetLastRead(
    requestMessage: action_message_pb.MessageSetLastReadRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_wrappers_pb.BoolValue|null) => void
  ): UnaryResponse;
  messageSetLastRead(
    requestMessage: action_message_pb.MessageSetLastReadRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_wrappers_pb.BoolValue|null) => void
  ): UnaryResponse;
  messagesLoadSinceLastRead(
    requestMessage: action_message_pb.MessagesLoadSinceLastReadRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: action_message_pb.MessagesLoadResponse|null) => void
  ): UnaryResponse;
  messagesLoadSinceLastRead(
    requestMessage: action_message_pb.MessagesLoadSinceLastReadRequest,
    callback: (error: ServiceError|null, responseMessage: action_message_pb.MessagesLoadResponse|null) => void
  ): UnaryResponse;
  messagesLoadForCurrentUnread(
    requestMessage: action_message_pb.MessagesLoadForCurrentUnreadRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: action_message_pb.MessagesLoadResponse|null) => void
  ): UnaryResponse;
  messagesLoadForCurrentUnread(
    requestMessage: action_message_pb.MessagesLoadForCurrentUnreadRequest,
    callback: (error: ServiceError|null, responseMessage: action_message_pb.MessagesLoadResponse|null) => void
  ): UnaryResponse;
  messagesLoad(
    requestMessage: action_message_pb.MessagesLoadRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: action_message_pb.MessagesLoadResponse|null) => void
  ): UnaryResponse;
  messagesLoad(
    requestMessage: action_message_pb.MessagesLoadRequest,
    callback: (error: ServiceError|null, responseMessage: action_message_pb.MessagesLoadResponse|null) => void
  ): UnaryResponse;
  messagesLoadChildren(
    requestMessage: action_message_pb.MessagesLoadChildrenRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: action_message_pb.MessagesLoadResponse|null) => void
  ): UnaryResponse;
  messagesLoadChildren(
    requestMessage: action_message_pb.MessagesLoadChildrenRequest,
    callback: (error: ServiceError|null, responseMessage: action_message_pb.MessagesLoadResponse|null) => void
  ): UnaryResponse;
  messageGetUnreadCount(
    requestMessage: google_protobuf_wrappers_pb.BoolValue,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: action_message_pb.MessageGetUnreadCountResponse|null) => void
  ): UnaryResponse;
  messageGetUnreadCount(
    requestMessage: google_protobuf_wrappers_pb.BoolValue,
    callback: (error: ServiceError|null, responseMessage: action_message_pb.MessageGetUnreadCountResponse|null) => void
  ): UnaryResponse;
  messageLoad(
    requestMessage: action_message_pb.MessageLoadRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: action_message_pb.MessageLoadResponse|null) => void
  ): UnaryResponse;
  messageLoad(
    requestMessage: action_message_pb.MessageLoadRequest,
    callback: (error: ServiceError|null, responseMessage: action_message_pb.MessageLoadResponse|null) => void
  ): UnaryResponse;
  channelCreate(
    requestMessage: action_channel_pb.ChannelCreateRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: object_channel_pb.Channel|null) => void
  ): UnaryResponse;
  channelCreate(
    requestMessage: action_channel_pb.ChannelCreateRequest,
    callback: (error: ServiceError|null, responseMessage: object_channel_pb.Channel|null) => void
  ): UnaryResponse;
  channelDelete(
    requestMessage: action_channel_pb.ChannelDeleteRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_wrappers_pb.BoolValue|null) => void
  ): UnaryResponse;
  channelDelete(
    requestMessage: action_channel_pb.ChannelDeleteRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_wrappers_pb.BoolValue|null) => void
  ): UnaryResponse;
  channelJoin(
    requestMessage: action_channel_pb.ChannelJoinRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_wrappers_pb.BoolValue|null) => void
  ): UnaryResponse;
  channelJoin(
    requestMessage: action_channel_pb.ChannelJoinRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_wrappers_pb.BoolValue|null) => void
  ): UnaryResponse;
  channelLeave(
    requestMessage: action_channel_pb.ChannelLeaveRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_wrappers_pb.BoolValue|null) => void
  ): UnaryResponse;
  channelLeave(
    requestMessage: action_channel_pb.ChannelLeaveRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_wrappers_pb.BoolValue|null) => void
  ): UnaryResponse;
  channelGetUsers(
    requestMessage: action_channel_pb.ChannelGetUsersRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: action_channel_pb.ChannelGetUsersResponse|null) => void
  ): UnaryResponse;
  channelGetUsers(
    requestMessage: action_channel_pb.ChannelGetUsersRequest,
    callback: (error: ServiceError|null, responseMessage: action_channel_pb.ChannelGetUsersResponse|null) => void
  ): UnaryResponse;
  userGetChannels(
    requestMessage: google_protobuf_wrappers_pb.BoolValue,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: action_channel_pb.UserGetChannelsResponse|null) => void
  ): UnaryResponse;
  userGetChannels(
    requestMessage: google_protobuf_wrappers_pb.BoolValue,
    callback: (error: ServiceError|null, responseMessage: action_channel_pb.UserGetChannelsResponse|null) => void
  ): UnaryResponse;
  messageSend(
    requestMessage: action_message_pb.MessageSendRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: object_message_pb.Message|null) => void
  ): UnaryResponse;
  messageSend(
    requestMessage: action_message_pb.MessageSendRequest,
    callback: (error: ServiceError|null, responseMessage: object_message_pb.Message|null) => void
  ): UnaryResponse;
  messageDelete(
    requestMessage: action_message_pb.MessageDeleteRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_wrappers_pb.BoolValue|null) => void
  ): UnaryResponse;
  messageDelete(
    requestMessage: action_message_pb.MessageDeleteRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_wrappers_pb.BoolValue|null) => void
  ): UnaryResponse;
  childMessageDelete(
    requestMessage: action_message_pb.ChildMessageDeleteRequest,
    metadata: grpc.Metadata,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_wrappers_pb.BoolValue|null) => void
  ): UnaryResponse;
  childMessageDelete(
    requestMessage: action_message_pb.ChildMessageDeleteRequest,
    callback: (error: ServiceError|null, responseMessage: google_protobuf_wrappers_pb.BoolValue|null) => void
  ): UnaryResponse;
  callBackEvents(requestMessage: google_protobuf_wrappers_pb.BoolValue, metadata?: grpc.Metadata): ResponseStream<action_action_pb.CallBackEvent>;
}

