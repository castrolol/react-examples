var Avatars = require("./avatar-model");
var uuid = require("uuid"); 

function AvatarRepository(){


}


AvatarRepository.prototype.all = function(callback) {
	Avatars.find({}, { binario: 0 }, function(err, result){
 
		callback.call(null, result)
	})
};

AvatarRepository.prototype.getBinary = function(avatarId, callback){

	Avatars.findOne({ avatarId: avatarId }, { binario: 1 }, function(err, result){
		if(err) return callback.call(null, err);
		if(!result) return callback.call(null, null);
		callback.call(null, result.binario);
	})

};

AvatarRepository.prototype.add = function(item, callback) {
	Avatars.create(item, function(err, result){
		callback.call(null, result)
	});
};

module.exports = new AvatarRepository();