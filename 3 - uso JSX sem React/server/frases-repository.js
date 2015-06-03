var Frase = require("./frases");
var uuid = require("uuid");
var gerarNome = require("./gerador-nome");
var posts = [];

function addPost(callback) {

	Frase.random(function (err, frase) {

		if (!err) {

			var fr = {

				frase: frase.corpo,
				autor: gerarNome(),
				uuid: uuid.v4()

			};

			if (frase.autor) {
				fr.frase += " - " + frase.autor;
			}

			var filtered = posts.filter(function (post) {
				return post.frase == fr.frase;
			})[0];
			
			//if(filtered) return;
			
			posts.unshift(fr);

			posts = posts.slice(0, 30);

		}

		callback();

	});
}

function nextPost() {


	addPost(function () {

		var tempo = Math.floor(Math.random() * 4000) + 2000;
		console.log(tempo);
		setTimeout(nextPost, tempo);
	});
}

for (var i = 0; i < 30; i++) {

	addPost(function () { });

}

nextPost();

module.exports = {
	getAll: function () {
		return posts;
	}
};