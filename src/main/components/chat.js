/* import filename */ var filename = 'chat';
/* import directives */ var directives = require('./../js/directives');
/* import Room */ var Room = require('./../js/model/Room');
/* import PrivateRoom */ var PrivateRoom = require('./../js/model/PrivateRoom');
/* import room */ var room = require('./room');
/* import Select */ var Select = require("./../js/tools/Select");
/* import Socket */ var Socket = require("./../js/model/Socket");
/* import AngularInjects */ var AngularInjects = require("./../js/AngularInjects");

var socket = Socket;

var $ = Select;
var KEY_ENTER = 13;
var KEY_ESC = 27;

directives.addTemplate(filename, {
    rooms: "=",
    activeRoom: "="
}, function($scope, elements) {
    var el = elements[0];
    if (!$scope.rooms) {
        $scope.rooms = [new Room("general", socket)];
    }
    if (!$scope.activeRoom) {
        $scope.activeRoom = $scope.rooms[0];
    }
    $scope.prepareAdd = function() {
        $scope.isAdding = true;
        $scope.newRoomName = "";
        AngularInjects.$timeout(function() {
            var inputEl = $(el).find(".room-menu input")[0];
            inputEl.focus();
        }, 0);
    }
    var addRoom = function(room) {
        $scope.rooms.push(room);
        $scope.selectRoom(room);
    }
    $scope.add = function() {
        $scope.isAdding = false;
        var room = new Room($scope.newRoomName, socket);
        addRoom(room);
    }
    $scope.onKeydown = function(event) {
        switch(event.keyCode) {
            case KEY_ENTER:
                $scope.add();
                break;
            case KEY_ESC:
                $scope.isAdding = false;
                break;
        }
    }
    $scope.selectRoom = function(room) {
        $scope.activeRoom = room;
    }
    AngularInjects.$rootScope.$on("openPrivateRoom", function(event, dest) {
        var privateRoom = new PrivateRoom(dest, socket);
        addRoom(privateRoom);
    });
    var treatMessage = function(roomFactory, messageObj) {
        AngularInjects.$timeout(function() {
            var roomId = messageObj.room;
            var room = Room.all[roomId];
            if (!room) {
                room = new roomFactory(roomId, socket);
                $scope.rooms.push(room);
            }
            room.messages.push(messageObj);
        }, 0);
    }
    AngularInjects.$rootScope.$on("privateMessage", function(event, messageObj) {
        treatMessage(PrivateRoom, messageObj);
    });
    AngularInjects.$rootScope.$on("roomMessage", function(event, messageObj) {
        treatMessage(Room, messageObj);
    });
});
