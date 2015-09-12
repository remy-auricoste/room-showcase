/* import app */ var app = require('./app');
/* import AngularInjects */ var AngularInjects = require('./AngularInjects');

'use strict';

var firstCapital = function(string) {
    return string.substring(0, 1).toUpperCase() + string.substring(1);
}

var object = {
    addTemplate: function(name, params, linkFct) {
        var directiveName = "d"+firstCapital(name);
        app.directive(directiveName, ['$document'
                                    , '$timeout'
                                    , '$location'
                                    , '$rootScope'
                                    , function($document
                                                , $timeout
                                                , $location
                                                , $rootScope
                                                ) {
            if (!AngularInjects.$document) {
                AngularInjects.$document = $document;
                AngularInjects.$timeout = $timeout;
                AngularInjects.$location = $location;
                AngularInjects.$rootScope = $rootScope;
            }
            var result = {
                scope: params,
                templateUrl: "../components/"+name+".html",
                transclude: params.transclude === true
            };
            if (params.transclude) {
                delete params.transclude;
            }
            if (linkFct) {
                result.link = function(a,b,c,d) {
                    var el = b[0];
                    angular.element(el).addClass(name);
                    return linkFct(a,b,c,d);
                };
            }
            return result;
        }]);
    }
}


module.exports = object;
