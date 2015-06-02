var gerarNome = require("./gerador-nome");
var Frase = require("./frases");
var Hapi = require("hapi");
var uuid = require("uuid");

var server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 3000  ,
	routes: { cors: true } 
});

var posts = [];

// Add the route
server.route({
    method: 'GET',
    path:'/posts', 
    handler: function (request, reply) {
       reply(posts);
    }
});


function addPost(callback){
	console.log("added!");
	Frase.random(function(err, frase){
		
		if(!err){
			
			var fr = {
				
				frase: frase.corpo,
				autor: gerarNome(),
				uuid: uuid.v4()
				
			};
			
			if(frase.autor){
				fr.frase += " - " + frase.autor;
			}
			
			var filtered = posts.filter(function(post){
				return post.frase == fr.frase;
			})[0];
			
			//if(filtered) return;
			
			posts.unshift(fr);
			
			posts = posts.slice(0, 30);
			
		}
		
		callback();
		
	});
}

function nextPost(){
	
		console.log("called!");
	addPost(function(){
		console.log("cb");
		var tempo = Math.floor(Math.random() * 4000) + 2000;
		console.log(tempo);
		setTimeout(nextPost, tempo);	
	});
}

for(var i = 0; i < 30; i++){
	
	addPost(function(){});
	
}

nextPost();

// Start the server
server.start();