import { grpc } from '@improbable-eng/grpc-web';
import { BoolValue } from 'google-protobuf/google/protobuf/wrappers_pb';

import { accessTokenVar } from 'lib/variables';

import { CallBackEvent } from './generated/action/action_pb';
import {
  ChatService,
  ChatServiceCallBackEvents,
} from './generated/action/action_pb_service';

/** Start a GRPC server-stream to listen for callback events. */
export const createMessagingStream = (
  handleHeaders: (headers: grpc.Metadata) => void,
  handleMessageEvent: (event: CallBackEvent) => void,
  handleConnectionEnd: (code: grpc.Code) => void
) => {
  const client = grpc.client<
    BoolValue,
    CallBackEvent,
    ChatServiceCallBackEvents
  >(ChatService.CallBackEvents, {
    host: process.env.NEXT_PUBLIC_MESSAGING_URL!,
    //transport: grpc.WebsocketTransport(),
  });

  client.onHeaders(handleHeaders);
  client.onMessage(handleMessageEvent);
  client.onEnd(handleConnectionEnd);

  client.start({
    Authorization: `Bearer ${accessTokenVar()}`,
  });

  client.send(new BoolValue());

  return client;
};
