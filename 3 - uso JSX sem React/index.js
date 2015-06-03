var Hapi = require("hapi");
var repository = require("./server/frases-repository");

var server = new Hapi.Server();

server.connection({ 
    host:   'localhost', 
    port:  8000 ,
    routes: { cors: true }
});

server.route({
    method: 'GET',
    path:'/posts', 
    handler: function (request, reply) {
       reply(repository.getAll());
    }
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
    path: '/babel-transformer.js',
     handler: function (request, reply) {
       reply.file("./node_modules/babel-core/browser.js");
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