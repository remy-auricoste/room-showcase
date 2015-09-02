var static = require('node-static');
var SocketServer = require("rauricoste-websocket-room-server");

var port = process.env.PORT || 8000;

var fileServer = new static.Server('./src/main', {
    cache: 1
});
var distServer = new static.Server('.', {
    cache: 1
});

String.prototype.startsWith = function(start) {
    return start.length <= this.length && this.substring(0, start.length) === start;
}

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        if (request.url.startsWith("/dist/")) {
            distServer.serve(request, response);
        } else {
            fileServer.serve(request, response);
        }
    }).resume();
}).listen(port);

//new SocketServer(8001);