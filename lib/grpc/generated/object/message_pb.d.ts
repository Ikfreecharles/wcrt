// package: object
// file: object/message.proto

import * as jspb from "google-protobuf";
import * as object_user_pb from "../object/user_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";

export class Message extends jspb.Message {
  getChannelId(): string;
  setChannelId(value: string): void;

  getMessageId(): string;
  setMessageId(value: string): void;

  hasCreatedat(): boolean;
  clearCreatedat(): void;
  getCreatedat(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedat(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasUpdatedat(): boolean;
  clearUpdatedat(): void;
  getUpdatedat(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setUpdatedat(value?: google_protobuf_timestamp_pb.Timestamp): void;

  getParentId(): string;
  setParentId(value: string): void;

  hasAuthor(): boolean;
  clearAuthor(): void;
  getAuthor(): object_user_pb.User | undefined;
  setAuthor(value?: object_user_pb.User): void;

  getType(): Message.TypeMap[keyof Message.TypeMap];
  setType(value: Message.TypeMap[keyof Message.TypeMap]): void;

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

  getChildCount(): number;
  setChildCount(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Message.AsObject;
  static toObject(includeInstance: boolean, msg: Message): Message.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Message, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Message;
  static deserializeBinaryFromReader(message: Message, reader: jspb.BinaryReader): Message;
}

export namespace Message {
  export type AsObject = {
    channelId: string,
    messageId: string,
    createdat?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    updatedat?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    parentId: string,
    author?: object_user_pb.User.AsObject,
    type: Message.TypeMap[keyof Message.TypeMap],
    content: string,
    mentionedUsersIdsList: Array<string>,
    referencedIdsList: Array<string>,
    childCount: number,
  }

  export interface TypeMap {
    TEXT: 0;
  }

  export const Type: TypeMap;
}

