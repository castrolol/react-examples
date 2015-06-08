var Hapi = require("hapi"); 
var comentarioRepository = require("./comentarios-repository");
var avatarRepository = require("./avatar-repository");
var server = new Hapi.Server();

avatarRepository.all(function(avatars){
    if(avatars && avatars.length) return

    require("./populate.js");
});

server.connection({ 
    host:   'localhost', 
    port:  8000 ,
    routes: { cors: true }
});
 
server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
        directory: {
            path: 'dist',
            listing: true
        }
    }
});
 
server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.file("dist/index.html");
    }
});

server.route({
    method: 'GET',
    path: '/avatars',
    handler: function(req, reply){
        
       avatarRepository.all(reply);
    }
})


server.route({
    method: 'GET',
    path: '/avatar/{avatarId}',
    handler: function(req, reply){

        avatarRepository.getBinary(req.params.avatarId, function(binary){
            reply(binary).type("image/png");
        });
    }
})


server.route({
    method: 'GET',
    path: '/comentarios',
    handler: function(req, reply){
        comentarioRepository.all(reply);
    }
})

server.route({
    method: 'POST',
    path: '/comentario',
    handler: function(req, reply){
        comentarioRepository.add(req.payload, reply);
    }
})

server.route({
    method: 'POST',
    path: '/comentario/{id}/resposta',
    handler: function(req, reply){

        comentarioRepository.addBy(req.params.id,  req.payload, function(err, comentario){
             
            if(err) return reply(err);
            reply(comentario);

        });
    }
})

server.start();