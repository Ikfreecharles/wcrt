// package: action
// file: action/action.proto

import * as jspb from "google-protobuf";
import * as object_channel_pb from "../object/channel_pb";
import * as object_message_pb from "../object/message_pb";
import * as event_event_pb from "../event/event_pb";
import * as action_channel_pb from "../action/channel_pb";
import * as action_message_pb from "../action/message_pb";
import * as google_protobuf_timestamp_pb from "google-protobuf/google/protobuf/timestamp_pb";
import * as google_protobuf_wrappers_pb from "google-protobuf/google/protobuf/wrappers_pb";

export class CallBackEvent extends jspb.Message {
  hasCreatedAt(): boolean;
  clearCreatedAt(): void;
  getCreatedAt(): google_protobuf_timestamp_pb.Timestamp | undefined;
  setCreatedAt(value?: google_protobuf_timestamp_pb.Timestamp): void;

  hasUserjoinedchannel(): boolean;
  clearUserjoinedchannel(): void;
  getUserjoinedchannel(): event_event_pb.UserJoinedChannelEvent | undefined;
  setUserjoinedchannel(value?: event_event_pb.UserJoinedChannelEvent): void;

  hasUserleftchannel(): boolean;
  clearUserleftchannel(): void;
  getUserleftchannel(): event_event_pb.UserLeftChannelEvent | undefined;
  setUserleftchannel(value?: event_event_pb.UserLeftChannelEvent): void;

  hasMessagecreated(): boolean;
  clearMessagecreated(): void;
  getMessagecreated(): event_event_pb.MessageCreatedEvent | undefined;
  setMessagecreated(value?: event_event_pb.MessageCreatedEvent): void;

  hasMessagedeleted(): boolean;
  clearMessagedeleted(): void;
  getMessagedeleted(): event_event_pb.MessageDeletedEvent | undefined;
  setMessagedeleted(value?: event_event_pb.MessageDeletedEvent): void;

  hasMessageupdatedevent(): boolean;
  clearMessageupdatedevent(): void;
  getMessageupdatedevent(): event_event_pb.MessageUpdatedEvent | undefined;
  setMessageupdatedevent(value?: event_event_pb.MessageUpdatedEvent): void;

  hasMessagereadevent(): boolean;
  clearMessagereadevent(): void;
  getMessagereadevent(): event_event_pb.MessageReadEvent | undefined;
  setMessagereadevent(value?: event_event_pb.MessageReadEvent): void;

  hasPing(): boolean;
  clearPing(): void;
  getPing(): event_event_pb.PingEvent | undefined;
  setPing(value?: event_event_pb.PingEvent): void;

  getEventCase(): CallBackEvent.EventCase;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CallBackEvent.AsObject;
  static toObject(includeInstance: boolean, msg: CallBackEvent): CallBackEvent.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CallBackEvent, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CallBackEvent;
  static deserializeBinaryFromReader(message: CallBackEvent, reader: jspb.BinaryReader): CallBackEvent;
}

export namespace CallBackEvent {
  export type AsObject = {
    createdAt?: google_protobuf_timestamp_pb.Timestamp.AsObject,
    userjoinedchannel?: event_event_pb.UserJoinedChannelEvent.AsObject,
    userleftchannel?: event_event_pb.UserLeftChannelEvent.AsObject,
    messagecreated?: event_event_pb.MessageCreatedEvent.AsObject,
    messagedeleted?: event_event_pb.MessageDeletedEvent.AsObject,
    messageupdatedevent?: event_event_pb.MessageUpdatedEvent.AsObject,
    messagereadevent?: event_event_pb.MessageReadEvent.AsObject,
    ping?: event_event_pb.PingEvent.AsObject,
  }

  export enum EventCase {
    EVENT_NOT_SET = 0,
    USERJOINEDCHANNEL = 2,
    USERLEFTCHANNEL = 3,
    MESSAGECREATED = 4,
    MESSAGEDELETED = 5,
    MESSAGEUPDATEDEVENT = 6,
    MESSAGEREADEVENT = 7,
    PING = 100,
  }
}

