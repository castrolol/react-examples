/** @jsx htmlElement */

//crio a url onde vai ser buscado os posts
var url = "/posts";

//obter os dados do servidor
"use strict";

function getData(callback) {

	fetch(url).then(function (response) {
		return response.json();
	}).then(function (posts) {

		callback(posts);
		setTimeout(getData.bind(this, callback), 1000);
	})["catch"](function (err) {
		console.log(err);
		setTimeout(getData.bind(this, callback), 1000);
	});
}

var containerElement = document.querySelector("main");

var mainElement = <div /> ;
console.log(mainElement);
containerElement.appendChild(mainElement);

getData(function (posts) {
	if(posts){
		mainElement.innerHTML = "";
	}
	var elements = posts.forEach(function (post) {

		mainElement.appendChild(
			<blockquote >
				<cite>
			 		{post.frase}
			 	</cite>
			 	<div className="autor">
			 		{post.autor}
			 	</div>
		 	</blockquote>
		);

	});
});
