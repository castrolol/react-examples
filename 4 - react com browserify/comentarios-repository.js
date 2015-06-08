var Comentarios = require("./comentario-model");
var uuid = require("uuid"); 

function ComentarioRepository(){


}


ComentarioRepository.prototype.all = function(callback) {
	Comentarios.find({}, function(err, comentarios){
	 
		callback.apply(null, arguments)
	})
};

ComentarioRepository.prototype.add = function(item, callback) {
	item.key = uuid.v4();
	Comentarios.create(item, function(err){
		callback.apply(null, arguments)
	});
};

 

ComentarioRepository.prototype.addBy = function(key, resposta, callback){

	Comentarios
		.update(
			{ key: key }, 
			{ $push : { comentarios: resposta } },
			function(err, comentario){ 
				callback(err, comentario);
			}
		);

};


module.exports = new ComentarioRepository();