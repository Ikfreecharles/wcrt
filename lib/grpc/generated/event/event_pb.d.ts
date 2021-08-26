// package: event
// file: event/event.proto

import * as jspb from "google-protobuf";
import * as object_user_pb from "../object/user_pb";
import * as object_message_pb from "../object/message_pb";

export class UserJoinedChannelEvent extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): object_user_pb.User | undefined;
  setUser(value?: object_user_pb.User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserJoinedChannelEvent.AsObject;
  static toObject(includeInstance: boolean, msg: UserJoinedChannelEvent): UserJoinedChannelEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserJoinedChannelEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserJoinedChannelEvent;
  static deserializeBinaryFromReader(message: UserJoinedChannelEvent, reader: jspb.BinaryReader): UserJoinedChannelEvent;
}

export namespace UserJoinedChannelEvent {
  export type AsObject = {
    channelId: string,
    user?: object_user_pb.User.AsObject,
  }
}

export class UserLeftChannelEvent extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  hasUser(): boolean;
  clearUser(): void;
  getUser(): object_user_pb.User | undefined;
  setUser(value?: object_user_pb.User): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserLeftChannelEvent.AsObject;
  static toObject(includeInstance: boolean, msg: UserLeftChannelEvent): UserLeftChannelEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserLeftChannelEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserLeftChannelEvent;
  static deserializeBinaryFromReader(message: UserLeftChannelEvent, reader: jspb.BinaryReader): UserLeftChannelEvent;
}

export namespace UserLeftChannelEvent {
  export type AsObject = {
    channelId: string,
    user?: object_user_pb.User.AsObject,
  }
}

export class MessageCreatedEvent extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): object_message_pb.Message | undefined;
  setMessage(value?: object_message_pb.Message): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageCreatedEvent.AsObject;
  static toObject(includeInstance: boolean, msg: MessageCreatedEvent): MessageCreatedEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageCreatedEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageCreatedEvent;
  static deserializeBinaryFromReader(message: MessageCreatedEvent, reader: jspb.BinaryReader): MessageCreatedEvent;
}

export namespace MessageCreatedEvent {
  export type AsObject = {
    message?: object_message_pb.Message.AsObject,
  }
}

export class MessageDeletedEvent extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageDeletedEvent.AsObject;
  static toObject(includeInstance: boolean, msg: MessageDeletedEvent): MessageDeletedEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageDeletedEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageDeletedEvent;
  static deserializeBinaryFromReader(message: MessageDeletedEvent, reader: jspb.BinaryReader): MessageDeletedEvent;
}

export namespace MessageDeletedEvent {
  export type AsObject = {
    channelId: string,
    messageId: string,
  }
}

export class MessageUpdatedEvent extends jspb.Message {
  hasUpdated(): boolean;
  clearUpdated(): void;
  getUpdated(): object_message_pb.Message | undefined;
  setUpdated(value?: object_message_pb.Message): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageUpdatedEvent.AsObject;
  static toObject(includeInstance: boolean, msg: MessageUpdatedEvent): MessageUpdatedEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageUpdatedEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageUpdatedEvent;
  static deserializeBinaryFromReader(message: MessageUpdatedEvent, reader: jspb.BinaryReader): MessageUpdatedEvent;
}

export namespace MessageUpdatedEvent {
  export type AsObject = {
    updated?: object_message_pb.Message.AsObject,
  }
}

export class MessageReadEvent extends jspb.Message {
  getLastRead(): string;
  setLastRead(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageReadEvent.AsObject;
  static toObject(includeInstance: boolean, msg: MessageReadEvent): MessageReadEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageReadEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageReadEvent;
  static deserializeBinaryFromReader(message: MessageReadEvent, reader: jspb.BinaryReader): MessageReadEvent;
}

export namespace MessageReadEvent {
  export type AsObject = {
    lastRead: string,
  }
}

export class PingEvent extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PingEvent.AsObject;
  static toObject(includeInstance: boolean, msg: PingEvent): PingEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PingEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PingEvent;
  static deserializeBinaryFromReader(message: PingEvent, reader: jspb.BinaryReader): PingEvent;
}

export namespace PingEvent {
  export type AsObject = {
  }
}

