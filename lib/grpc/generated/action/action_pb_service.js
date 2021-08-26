// package: action
// file: action/action.proto

var action_action_pb = require("../action/action_pb");
var object_channel_pb = require("../object/channel_pb");
var object_message_pb = require("../object/message_pb");
var action_channel_pb = require("../action/channel_pb");
var action_message_pb = require("../action/message_pb");
var google_protobuf_wrappers_pb = require("google-protobuf/google/protobuf/wrappers_pb");
var grpc = require("@improbable-eng/grpc-web").grpc;

var ChatService = (function () {
  function ChatService() {}
  ChatService.serviceName = "action.ChatService";
  return ChatService;
}());

ChatService.MessageSetLastRead = {
  methodName: "MessageSetLastRead",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_message_pb.MessageSetLastReadRequest,
  responseType: google_protobuf_wrappers_pb.BoolValue
};

ChatService.MessagesLoadSinceLastRead = {
  methodName: "MessagesLoadSinceLastRead",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_message_pb.MessagesLoadSinceLastReadRequest,
  responseType: action_message_pb.MessagesLoadResponse
};

ChatService.MessagesLoadForCurrentUnread = {
  methodName: "MessagesLoadForCurrentUnread",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_message_pb.MessagesLoadForCurrentUnreadRequest,
  responseType: action_message_pb.MessagesLoadResponse
};

ChatService.MessagesLoad = {
  methodName: "MessagesLoad",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_message_pb.MessagesLoadRequest,
  responseType: action_message_pb.MessagesLoadResponse
};

ChatService.MessagesLoadChildren = {
  methodName: "MessagesLoadChildren",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_message_pb.MessagesLoadChildrenRequest,
  responseType: action_message_pb.MessagesLoadResponse
};

ChatService.MessageGetUnreadCount = {
  methodName: "MessageGetUnreadCount",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_wrappers_pb.BoolValue,
  responseType: action_message_pb.MessageGetUnreadCountResponse
};

ChatService.MessageLoad = {
  methodName: "MessageLoad",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_message_pb.MessageLoadRequest,
  responseType: action_message_pb.MessageLoadResponse
};

ChatService.ChannelCreate = {
  methodName: "ChannelCreate",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_channel_pb.ChannelCreateRequest,
  responseType: object_channel_pb.Channel
};

ChatService.ChannelDelete = {
  methodName: "ChannelDelete",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_channel_pb.ChannelDeleteRequest,
  responseType: google_protobuf_wrappers_pb.BoolValue
};

ChatService.ChannelJoin = {
  methodName: "ChannelJoin",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_channel_pb.ChannelJoinRequest,
  responseType: google_protobuf_wrappers_pb.BoolValue
};

ChatService.ChannelLeave = {
  methodName: "ChannelLeave",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_channel_pb.ChannelLeaveRequest,
  responseType: google_protobuf_wrappers_pb.BoolValue
};

ChatService.ChannelGetUsers = {
  methodName: "ChannelGetUsers",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_channel_pb.ChannelGetUsersRequest,
  responseType: action_channel_pb.ChannelGetUsersResponse
};

ChatService.UserGetChannels = {
  methodName: "UserGetChannels",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: google_protobuf_wrappers_pb.BoolValue,
  responseType: action_channel_pb.UserGetChannelsResponse
};

ChatService.MessageSend = {
  methodName: "MessageSend",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_message_pb.MessageSendRequest,
  responseType: object_message_pb.Message
};

ChatService.MessageDelete = {
  methodName: "MessageDelete",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_message_pb.MessageDeleteRequest,
  responseType: google_protobuf_wrappers_pb.BoolValue
};

ChatService.ChildMessageDelete = {
  methodName: "ChildMessageDelete",
  service: ChatService,
  requestStream: false,
  responseStream: false,
  requestType: action_message_pb.ChildMessageDeleteRequest,
  responseType: google_protobuf_wrappers_pb.BoolValue
};

ChatService.CallBackEvents = {
  methodName: "CallBackEvents",
  service: ChatService,
  requestStream: false,
  responseStream: true,
  requestType: google_protobuf_wrappers_pb.BoolValue,
  responseType: action_action_pb.CallBackEvent
};

exports.ChatService = ChatService;

function ChatServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

ChatServiceClient.prototype.messageSetLastRead = function messageSetLastRead(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.MessageSetLastRead, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.messagesLoadSinceLastRead = function messagesLoadSinceLastRead(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.MessagesLoadSinceLastRead, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.messagesLoadForCurrentUnread = function messagesLoadForCurrentUnread(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.MessagesLoadForCurrentUnread, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.messagesLoad = function messagesLoad(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.MessagesLoad, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.messagesLoadChildren = function messagesLoadChildren(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.MessagesLoadChildren, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.messageGetUnreadCount = function messageGetUnreadCount(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.MessageGetUnreadCount, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.messageLoad = function messageLoad(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.MessageLoad, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.channelCreate = function channelCreate(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.ChannelCreate, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.channelDelete = function channelDelete(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.ChannelDelete, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.channelJoin = function channelJoin(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.ChannelJoin, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.channelLeave = function channelLeave(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.ChannelLeave, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.channelGetUsers = function channelGetUsers(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.ChannelGetUsers, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.userGetChannels = function userGetChannels(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.UserGetChannels, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.messageSend = function messageSend(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.MessageSend, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.messageDelete = function messageDelete(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.MessageDelete, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.childMessageDelete = function childMessageDelete(requestMessage, metadata, callback) {
  if (arguments.length === 2) {
    callback = arguments[1];
  }
  var client = grpc.unary(ChatService.ChildMessageDelete, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onEnd: function (response) {
      if (callback) {
        if (response.status !== grpc.Code.OK) {
          var err = new Error(response.statusMessage);
          err.code = response.status;
          err.metadata = response.trailers;
          callback(err, null);
        } else {
          callback(null, response.message);
        }
      }
    }
  });
  return {
    cancel: function () {
      callback = null;
      client.close();
    }
  };
};

ChatServiceClient.prototype.callBackEvents = function callBackEvents(requestMessage, metadata) {
  var listeners = {
    data: [],
    end: [],
    status: []
  };
  var client = grpc.invoke(ChatService.CallBackEvents, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.ChatServiceClient = ChatServiceClient;

