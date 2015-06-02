var Hapi = require("hapi");


var server = new Hapi.Server();
server.connection({ 
    host: process.env.IP || 'localhost', 
    port: process.env.PORT || 8000 
});



server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'static',
            listing: true
        }
    }
});


server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file("static/index.html");
    }
});

server.start();