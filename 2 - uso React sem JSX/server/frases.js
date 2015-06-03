var tungus = require('tungus');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var FraseSchema = Schema({
    autor: String,
    corpo: String
});

var lasts = [];

FraseSchema.statics.random = function(callback) {
  this.count(function(err, count) {
      
    if (err) {
      return callback(err);
    }
    var random = null;
    do{
    
        random = Math.round(Math.random() * (count-1));
    
    }while(lasts.indexOf(random) > -1);
    
    lasts.unshift(random);
    
    lasts = lasts.slice(0, 50);
    
    this.findOne().skip(random).exec(callback);
  }.bind(this));
};


var Frase = mongoose.model('Frase', FraseSchema);
Frase.onConnected = function(){};

mongoose.connect('tingodb://'+__dirname+'/data', function (err) {
    console.log(arguments);
  if (err) throw err;
    Frase.onConnected();
});

module.exports = Frase;