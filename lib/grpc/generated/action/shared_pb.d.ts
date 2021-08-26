// package: action
// file: action/shared.proto

import * as jspb from "google-protobuf";

export class Pagination extends jspb.Message {
  getCursor(): string;
  setCursor(value: string): void;

  getDirection(): Pagination.DirectionMap[keyof Pagination.DirectionMap];
  setDirection(value: Pagination.DirectionMap[keyof Pagination.DirectionMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Pagination.AsObject;
  static toObject(includeInstance: boolean, msg: Pagination): Pagination.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Pagination, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Pagination;
  static deserializeBinaryFromReader(message: Pagination, reader: jspb.BinaryReader): Pagination;
}

export namespace Pagination {
  export type AsObject = {
    cursor: string,
    direction: Pagination.DirectionMap[keyof Pagination.DirectionMap],
  }

  export interface DirectionMap {
    BEFORE: 0;
    AFTER: 1;
  }

  export const Direction: DirectionMap;
}

