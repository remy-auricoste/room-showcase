/* import filename */ var filename = 'room';
/* import directives */ var directives = require('./../js/directives');
/* import Select */ var Select = require("./../js/tools/Select");
/* import AngularInjects */ var AngularInjects = require("../js/AngularInjects");

var $ = Select;

var KEY_ENTER = 13;
var KEY_ESC = 27;

directives.addTemplate(filename, {
    room: "="
}, function($scope, elements) {
    var el = elements[0];
    if ($scope.room.private) {
        $scope.room.element = el;
    }

    var textEl = $(el).find(".text")[0];
    textEl.focus();
    $scope.text = "";
    $scope.onKeydown = function(event) {
        if (event.keyCode === KEY_ENTER && $scope.text.length) {
            $scope.room.send($scope.text);
            $scope.text = "";
        } else if (event.keyCode === KEY_ESC) {
            $scope.text = "";
        }
    }
    $scope.onUserMouseOver = function(user) {
        $scope.userMouseOver = user;
    }
    $scope.onUserMouseOut = function(user) {
        $scope.userMouseOver = null;
    }
    $scope.onUserClick = function(user) {
        $scope.text = user+" > "+$scope.text;
        textEl.focus();
    }
    $scope.onMemberClick = function(member) {
        AngularInjects.$rootScope.$emit("openPrivateRoom", member);
    }
    $scope.sendStream = function() {
        $scope.room.sendStream();
    }
});
