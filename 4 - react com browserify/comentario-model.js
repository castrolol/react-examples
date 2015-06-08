var tungus = require('tungus');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var ComentarioSchema = new Schema();
ComentarioSchema.add({
    key: String,
    data: Date,
    texto: String,
    autor: String,
    avatar: String,
    comentarios: [ComentarioSchema]
});
 

var Comentarios = mongoose.model('Comentario', ComentarioSchema);
Comentarios.onConnected = function(){};

mongoose.connect('tingodb://'+__dirname+'/data', function (err) {
    console.log(arguments);
  if (err) throw err;
    Comentarios.onConnected();
});

module.exports = Comentarios;