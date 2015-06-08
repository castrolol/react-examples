var tungus = require('tungus');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var AvatarSchema = new Schema();
AvatarSchema.add({
    avatarId: String,
    desc: String,
    binario: Buffer
});
 

var Avatars = mongoose.model('Avatar', AvatarSchema);
Avatars.onConnected = function(){};

mongoose.connect('tingodb://'+__dirname+'/data', function (err) {
    console.log(arguments);
  if (err) throw err;
    Avatars.onConnected();
});

module.exports = Avatars;