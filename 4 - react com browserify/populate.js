 var uuid = require("uuid");
 var repository = require("./avatar-repository.js");
 var fs = require("fs"); 
 try {
 	fs.unlinkSync(__dirname + '/data/avatar');
 	console.log("removed old data")
 } catch (e) {}

 

 	var folder = "./img";

 	var imgs = fs.readdirSync(folder);

 	imgs.forEach(function(imgPath) {

 		repository.add({
 			avatarId: uuid.v4(),
 			desc: imgPath,
 			binario: fs.readFileSync(folder + "/" + imgPath)
 		}, function(err) {
 			 
 		});

 	});

 