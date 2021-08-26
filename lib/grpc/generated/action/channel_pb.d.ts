// package: action
// file: action/channel.proto

import * as jspb from "google-protobuf";
import * as object_channel_pb from "../object/channel_pb";
import * as object_user_pb from "../object/user_pb";

export class ChannelCreateRequest extends jspb.Message {
  getTopic(): string;
  setTopic(value: string): void;

  getType(): object_channel_pb.ChannelTypeMap[keyof object_channel_pb.ChannelTypeMap];
  setType(value: object_channel_pb.ChannelTypeMap[keyof object_channel_pb.ChannelTypeMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelCreateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelCreateRequest): ChannelCreateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelCreateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelCreateRequest;
  static deserializeBinaryFromReader(message: ChannelCreateRequest, reader: jspb.BinaryReader): ChannelCreateRequest;
}

export namespace ChannelCreateRequest {
  export type AsObject = {
    topic: string,
    type: object_channel_pb.ChannelTypeMap[keyof object_channel_pb.ChannelTypeMap],
  }
}

export class ChannelDeleteRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelDeleteRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelDeleteRequest): ChannelDeleteRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelDeleteRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelDeleteRequest;
  static deserializeBinaryFromReader(message: ChannelDeleteRequest, reader: jspb.BinaryReader): ChannelDeleteRequest;
}

export namespace ChannelDeleteRequest {
  export type AsObject = {
    channelId: string,
  }
}

export class ChannelJoinRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelJoinRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelJoinRequest): ChannelJoinRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelJoinRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelJoinRequest;
  static deserializeBinaryFromReader(message: ChannelJoinRequest, reader: jspb.BinaryReader): ChannelJoinRequest;
}

export namespace ChannelJoinRequest {
  export type AsObject = {
    channelId: string,
    userId: string,
  }
}

export class ChannelLeaveRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelLeaveRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelLeaveRequest): ChannelLeaveRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelLeaveRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelLeaveRequest;
  static deserializeBinaryFromReader(message: ChannelLeaveRequest, reader: jspb.BinaryReader): ChannelLeaveRequest;
}

export namespace ChannelLeaveRequest {
  export type AsObject = {
    channelId: string,
    userId: string,
  }
}

export class ChannelGetUsersRequest extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelGetUsersRequest.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelGetUsersRequest): ChannelGetUsersRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelGetUsersRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelGetUsersRequest;
  static deserializeBinaryFromReader(message: ChannelGetUsersRequest, reader: jspb.BinaryReader): ChannelGetUsersRequest;
}

export namespace ChannelGetUsersRequest {
  export type AsObject = {
    channelId: string,
  }
}

export class ChannelGetUsersResponse extends jspb.Message {
  clearUsersList(): void;
  getUsersList(): Array<object_user_pb.User>;
  setUsersList(value: Array<object_user_pb.User>): void;
  addUsers(value?: object_user_pb.User, index?: number): object_user_pb.User;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ChannelGetUsersResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ChannelGetUsersResponse): ChannelGetUsersResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ChannelGetUsersResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ChannelGetUsersResponse;
  static deserializeBinaryFromReader(message: ChannelGetUsersResponse, reader: jspb.BinaryReader): ChannelGetUsersResponse;
}

export namespace ChannelGetUsersResponse {
  export type AsObject = {
    usersList: Array<object_user_pb.User.AsObject>,
  }
}

export class UserGetChannelsResponse extends jspb.Message {
  clearChannelsList(): void;
  getChannelsList(): Array<object_channel_pb.Channel>;
  setChannelsList(value: Array<object_channel_pb.Channel>): void;
  addChannels(value?: object_channel_pb.Channel, index?: number): object_channel_pb.Channel;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserGetChannelsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserGetChannelsResponse): UserGetChannelsResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UserGetChannelsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserGetChannelsResponse;
  static deserializeBinaryFromReader(message: UserGetChannelsResponse, reader: jspb.BinaryReader): UserGetChannelsResponse;
}

export namespace UserGetChannelsResponse {
  export type AsObject = {
    channelsList: Array<object_channel_pb.Channel.AsObject>,
  }
}

