/* import filename */ var filename = 'chat';
/* import directives */ var directives = require('./../js/directives');
/* import Room */ var Room = require('./../js/model/Room');
/* import room */ var room = require('./room');

directives.addTemplate(filename, {
    rooms: "=",
    activeRoom: "="
}, function($scope, elements) {
    var el = elements[0];
    if (!$scope.rooms) {
        $scope.rooms = [new Room("general")];
    }
    if (!$scope.activeRoom) {
        $scope.activeRoom = $scope.rooms[0];
    }
    $scope.prepareAdd = function() {
        $scope.isAdding = true;
        $scope.newRoomName = "";
        console.log(angular.element(el).find(".room-menu.add input"));
    }
    $scope.add = function() {
        $scope.isAdding = false;
        $scope.rooms.push(new Room($scope.newRoomName));
    }
});
