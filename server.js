var static = require('node-static');
var SocketServer = require("rauricoste-websocket-room-server");

var port = process.env.port || 8000;

var fileServer = new static.Server('.', {
    cache: 1
});

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(port);

//new SocketServer(8001);