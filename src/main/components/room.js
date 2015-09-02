/* import filename */ var filename = 'room';
/* import directives */ var directives = require('./../js/directives');
/* import Select */ var Select = require("./../js/tools/Select");

var $ = Select;

var KEY_ENTER = 13;
var KEY_ESC = 27;

directives.addTemplate(filename, {
    room: "="
}, function($scope, elements) {
    var el = elements[0];
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
        // TODO open private room
    }
});
