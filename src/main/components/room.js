/* import filename */ var filename = 'room';
/* import directives */ var directives = require('./../js/directives');

var KEY_ENTER = 13;

directives.addTemplate(filename, {
    room: "="
}, function($scope) {
    $scope.text = "";
    $scope.onKeydown = function(event) {
        if (event.keyCode === KEY_ENTER && $scope.text.length) {
            $scope.room.send($scope.text);
            $scope.text = "";
        }
    }
});
