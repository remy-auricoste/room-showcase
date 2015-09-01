/* import Fifo */ var Fifo = require("./../tools/Fifo");

var Room = function(name, socket) {
    Room.all[name] = this;
    this.socket = socket;
    this.name = name;
    this.messages = new Fifo(20);
    socket.joinRoom(name);
    this.members = [];
    this.messages.push({message: "Vous avez rejoint le channel "+name});
}
Room.prototype.send = function(message) {
    this.socket.sendRoom(this.name, message);
}
Room.all = {};

module.exports = Room;