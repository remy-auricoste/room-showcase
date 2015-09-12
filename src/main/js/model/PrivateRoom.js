/* import Fifo */ var Fifo = require("./../tools/Fifo");
/* import Room */ var Room = require("./Room");
var RtcSocket = require("rauricoste-webrtc-client");

var PrivateRoom = function(dest, socket) {
    Room.all[dest] = this;
    this.socket = socket;
    this.dest = dest;
    this.name = dest.substring(0, 6)+"...";
    this.messages = new Fifo(20);
    this.messages.push({message: "Vous avez rejoint la discussion privée avec "+dest});
}
PrivateRoom.prototype.send = function(message) {
    this.socket.send(this.dest, message);
}

module.exports = PrivateRoom;