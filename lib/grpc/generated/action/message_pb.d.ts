// package: action
// file: action/message.proto

import * as jspb from "google-protobuf";
import * as object_message_pb from "../object/message_pb";
import * as action_shared_pb from "../action/shared_pb";

export class MessageSendRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getParentId(): string;
  setParentId(value: string): void;

  getType(): MessageSendRequest.TypeMap[keyof MessageSendRequest.TypeMap];
  setType(value: MessageSendRequest.TypeMap[keyof MessageSendRequest.TypeMap]): void;

  getContent(): string;
  setContent(value: string): void;

  clearMentionedUsersIdsList(): void;
  getMentionedUsersIdsList(): Array<string>;
  setMentionedUsersIdsList(value: Array<string>): void;
  addMentionedUsersIds(value: string, index?: number): string;

  clearReferencedIdsList(): void;
  getReferencedIdsList(): Array<string>;
  setReferencedIdsList(value: Array<string>): void;
  addReferencedIds(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageSendRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessageSendRequest): MessageSendRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageSendRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageSendRequest;
  static deserializeBinaryFromReader(message: MessageSendRequest, reader: jspb.BinaryReader): MessageSendRequest;
}

export namespace MessageSendRequest {
  export type AsObject = {
    channelId: string,
    parentId: string,
    type: MessageSendRequest.TypeMap[keyof MessageSendRequest.TypeMap],
    content: string,
    mentionedUsersIdsList: Array<string>,
    referencedIdsList: Array<string>,
  }

  export interface TypeMap {
    TEXT: 0;
  }

  export const Type: TypeMap;
}

export class MessageDeleteRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageDeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessageDeleteRequest): MessageDeleteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageDeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageDeleteRequest;
  static deserializeBinaryFromReader(message: MessageDeleteRequest, reader: jspb.BinaryReader): MessageDeleteRequest;
}

export namespace MessageDeleteRequest {
  export type AsObject = {
    channelId: string,
    messageId: string,
  }
}

export class ChildMessageDeleteRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getParentId(): string;
  setParentId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChildMessageDeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChildMessageDeleteRequest): ChildMessageDeleteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChildMessageDeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChildMessageDeleteRequest;
  static deserializeBinaryFromReader(message: ChildMessageDeleteRequest, reader: jspb.BinaryReader): ChildMessageDeleteRequest;
}

export namespace ChildMessageDeleteRequest {
  export type AsObject = {
    channelId: string,
    parentId: string,
    messageId: string,
  }
}

export class MessageSetLastReadRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageSetLastReadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessageSetLastReadRequest): MessageSetLastReadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageSetLastReadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageSetLastReadRequest;
  static deserializeBinaryFromReader(message: MessageSetLastReadRequest, reader: jspb.BinaryReader): MessageSetLastReadRequest;
}

export namespace MessageSetLastReadRequest {
  export type AsObject = {
    channelId: string,
    messageId: string,
  }
}

export class MessagesLoadChildrenRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessagesLoadChildrenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessagesLoadChildrenRequest): MessagesLoadChildrenRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessagesLoadChildrenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessagesLoadChildrenRequest;
  static deserializeBinaryFromReader(message: MessagesLoadChildrenRequest, reader: jspb.BinaryReader): MessagesLoadChildrenRequest;
}

export namespace MessagesLoadChildrenRequest {
  export type AsObject = {
    channelId: string,
    messageId: string,
  }
}

export class MessagesLoadSinceLastReadRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessagesLoadSinceLastReadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessagesLoadSinceLastReadRequest): MessagesLoadSinceLastReadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessagesLoadSinceLastReadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessagesLoadSinceLastReadRequest;
  static deserializeBinaryFromReader(message: MessagesLoadSinceLastReadRequest, reader: jspb.BinaryReader): MessagesLoadSinceLastReadRequest;
}

export namespace MessagesLoadSinceLastReadRequest {
  export type AsObject = {
    channelId: string,
  }
}

export class MessagesLoadForCurrentUnreadRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessagesLoadForCurrentUnreadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessagesLoadForCurrentUnreadRequest): MessagesLoadForCurrentUnreadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessagesLoadForCurrentUnreadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessagesLoadForCurrentUnreadRequest;
  static deserializeBinaryFromReader(message: MessagesLoadForCurrentUnreadRequest, reader: jspb.BinaryReader): MessagesLoadForCurrentUnreadRequest;
}

export namespace MessagesLoadForCurrentUnreadRequest {
  export type AsObject = {
    channelId: string,
  }
}

export class MessagesLoadResponse extends jspb.Message {
  clearMessagesList(): void;
  getMessagesList(): Array<object_message_pb.Message>;
  setMessagesList(value: Array<object_message_pb.Message>): void;
  addMessages(value?: object_message_pb.Message, index?: number): object_message_pb.Message;

  getCursor(): string;
  setCursor(value: string): void;

  getHasnextpage(): boolean;
  setHasnextpage(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessagesLoadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MessagesLoadResponse): MessagesLoadResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessagesLoadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessagesLoadResponse;
  static deserializeBinaryFromReader(message: MessagesLoadResponse, reader: jspb.BinaryReader): MessagesLoadResponse;
}

export namespace MessagesLoadResponse {
  export type AsObject = {
    messagesList: Array<object_message_pb.Message.AsObject>,
    cursor: string,
    hasnextpage: boolean,
  }
}

export class MessagesLoadRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  hasPagination(): boolean;
  clearPagination(): void;
  getPagination(): action_shared_pb.Pagination | undefined;
  setPagination(value?: action_shared_pb.Pagination): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessagesLoadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessagesLoadRequest): MessagesLoadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessagesLoadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessagesLoadRequest;
  static deserializeBinaryFromReader(message: MessagesLoadRequest, reader: jspb.BinaryReader): MessagesLoadRequest;
}

export namespace MessagesLoadRequest {
  export type AsObject = {
    channelId: string,
    pagination?: action_shared_pb.Pagination.AsObject,
  }
}

export class MessageGetUnreadCountResponse extends jspb.Message {
  clearChannelsList(): void;
  getChannelsList(): Array<MessageGetUnreadCountResponse.Channel>;
  setChannelsList(value: Array<MessageGetUnreadCountResponse.Channel>): void;
  addChannels(value?: MessageGetUnreadCountResponse.Channel, index?: number): MessageGetUnreadCountResponse.Channel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageGetUnreadCountResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MessageGetUnreadCountResponse): MessageGetUnreadCountResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageGetUnreadCountResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageGetUnreadCountResponse;
  static deserializeBinaryFromReader(message: MessageGetUnreadCountResponse, reader: jspb.BinaryReader): MessageGetUnreadCountResponse;
}

export namespace MessageGetUnreadCountResponse {
  export type AsObject = {
    channelsList: Array<MessageGetUnreadCountResponse.Channel.AsObject>,
  }

  export class Channel extends jspb.Message {
    getChannelId(): string;
    setChannelId(value: string): void;

    getCount(): number;
    setCount(value: number): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Channel.AsObject;
    static toObject(includeInstance: boolean, msg: Channel): Channel.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Channel, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Channel;
    static deserializeBinaryFromReader(message: Channel, reader: jspb.BinaryReader): Channel;
  }

  export namespace Channel {
    export type AsObject = {
      channelId: string,
      count: number,
    }
  }
}

export class MessageLoadRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageLoadRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessageLoadRequest): MessageLoadRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageLoadRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageLoadRequest;
  static deserializeBinaryFromReader(message: MessageLoadRequest, reader: jspb.BinaryReader): MessageLoadRequest;
}

export namespace MessageLoadRequest {
  export type AsObject = {
    channelId: string,
    messageId: string,
  }
}

export class MessageLoadResponse extends jspb.Message {
  hasMessage(): boolean;
  clearMessage(): void;
  getMessage(): object_message_pb.Message | undefined;
  setMessage(value?: object_message_pb.Message): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageLoadResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MessageLoadResponse): MessageLoadResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: MessageLoadResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageLoadResponse;
  static deserializeBinaryFromReader(message: MessageLoadResponse, reader: jspb.BinaryReader): MessageLoadResponse;
}

export namespace MessageLoadResponse {
  export type AsObject = {
    message?: object_message_pb.Message.AsObject,
  }
}

