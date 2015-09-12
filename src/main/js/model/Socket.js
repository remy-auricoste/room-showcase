var SocketBus = require("rauricoste-websocket-room-client");
/* import AngularInjects */ var AngularInjects = require("./../AngularInjects");
/* import Room */ var Room = require("./Room");

var rooms = Room.all;

var socket = new SocketBus({
    host: ["websocket-room-ws.herokuapp.com", "websocket-room-http.herokuapp.com"],
    onReceive: function(messageObj) {
        if (messageObj.room) {
            AngularInjects.$rootScope.$emit("roomMessage", {user: messageObj.source, message: messageObj.message, room: messageObj.room});
        } else if (messageObj.dest === socket.id) {
            AngularInjects.$rootScope.$emit("privateMessage", {user: messageObj.source, message: messageObj.message, room: messageObj.source});
        } else {
            console.error("received unprocessed message", messageObj);
        }
    },
    onRoomChange: function(roomChange) {
        var roomName = roomChange.room;
        var room = rooms[roomName];
        if (room) {
            AngularInjects.$timeout(function() {
                room.members = roomChange.members;
            }, 0);
        }
    }
});
module.exports = socket;