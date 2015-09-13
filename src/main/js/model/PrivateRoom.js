/* import Fifo */ var Fifo = require("./../tools/Fifo");
/* import Room */ var Room = require("./Room");
var RtcSocket = require("rauricoste-webrtc-client");
/* import AngularInjects */ var AngularInjects = require("../AngularInjects");
/* import Select */ var Select = require("../tools/Select");

var $ = Select;

var PrivateRoom = function(dest, socket) {
    var self = this;
    this.private = true;
    Room.all[dest] = this;
    this.socket = socket;
    this.rtc = new RtcSocket(socket, function(streamUrl) {
        $(self.element).find(".inStream")[0].src = streamUrl;
        $(self.element).find(".inStream")[0].src = streamUrl;
    });
    this.dest = dest;
    this.name = dest.substring(0, 6)+"...";
    this.messages = new Fifo(20);
    this.messages.push({message: "Vous avez rejoint la discussion privée avec "+dest});
}
PrivateRoom.prototype.send = function(message) {
    var self = this;
    this.messages.push({user: "me", message: message});
    this.socket.send(this.dest, message);
}
PrivateRoom.prototype.sendStream = function() {
    this.rtc.connect(this.dest, { "audio": false, "video": true });
}

module.exports = PrivateRoom;