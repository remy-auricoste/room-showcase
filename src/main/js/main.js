/* import angular */ var angular = require('angular');
require('angular-route');
/* import app */ var app = require("./app");

'use strict';


require("../components/chat");

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/home', {template: '<d-chat></d-chat>'})
      .otherwise({redirectTo: '/home'});
}]);
