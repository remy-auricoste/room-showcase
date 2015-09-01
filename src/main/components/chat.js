/* import filename */ var filename = 'chat';
/* import directives */ var directives = require('./../js/directives');
/* import Room */ var Room = require('./../js/model/Room');
/* import room */ var room = require('./room');
/* import Select */ var Select = require("./../js/tools/Select");
/* import Socket */ var Socket = require("./../js/model/Socket");

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
        setTimeout(function() {
            var inputEl = $(el).find(".room-menu input")[0];
            inputEl.focus();
        }, 0);
    }
    $scope.add = function() {
        $scope.isAdding = false;
        var room = new Room($scope.newRoomName, socket);
        $scope.rooms.push(room);
        $scope.selectRoom(room);
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
});
