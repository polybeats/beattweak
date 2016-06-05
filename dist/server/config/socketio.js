/**
 * Socket.io configuration
 */
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket) {
    socket.address = socket.request.connection.remoteAddress + ':' + socket.request.connection.remotePort;

    socket.connectedAt = new Date();

    socket.log = function () {
      var _console;

      for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
        data[_key] = arguments[_key];
      }

      (_console = console).log.apply(_console, ['SocketIO ' + socket.nsp.name + ' [' + socket.address + ']'].concat(data));
    };

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      socket.log('DISCONNECTED');
    });

    // Call room:play.
    socket.on('room:play', function (response) {
      // onDisconnect(socket);
      socket.log('STARTED PLAYING');
      socket.broadcast.emit('room:play', response);
    });

    // Call room:pause.
    socket.on('room:pause', function (response) {
      // onDisconnect(socket);
      socket.log('PAUSED PLAYING');
      socket.broadcast.emit('room:pause', response);
    });

    // Call room:beatUpdate.
    socket.on('room:beatUpdate', function (response) {
      // onDisconnect(socket);
      socket.log('UPDATED BEATS');
      socket.broadcast.emit('room:beatUpdate', response);
    });

    // Call room:update.
    socket.on('room:update', function (response) {
      // onDisconnect(socket);
      socket.log('UPDATED ROOM');
      socket.broadcast.emit('room:update', response);
    });

    // Call onConnect.
    onConnect(socket);
    socket.log('CONNECTED');
  });
};

var _environment = require('./environment');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// When the user disconnects.. perform this
function onDisconnect(socket) {}

// When the user connects.. perform this
function onConnect(socket) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    socket.log((0, _stringify2.default)(data, null, 2));
  });

  // Insert sockets below
  require('../api/room/room.socket').register(socket);
}
//# sourceMappingURL=socketio.js.map
