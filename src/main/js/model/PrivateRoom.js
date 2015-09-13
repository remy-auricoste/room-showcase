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
    var showVideos = function() {
        $(self.element).find(".videos-container")[0].style.display = "inline-block";
    }

    this.rtc = new RtcSocket(socket, function(socket) {}, function(streamUrl) {
        $(self.element).find(".inStream")[0].src = streamUrl;
        showVideos();
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
    var self = this;
    this.rtc.sendStream(this.dest, { "audio": false, "video": true }).then(function(streamUrl) {
        $(self.element).find(".outStream")[0].src = streamUrl;
        showVideos();
    });
}

module.exports = PrivateRoom;