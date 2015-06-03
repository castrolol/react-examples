var cheerio = require("cheerio");
var request = require("request");
var Frase = require("./server/frases.js");
var fs = require("fs");
 
try{
	fs.unlinkSync(__dirname +'/server/data/frases');
	console.log("removed old data")
}catch(e){}
 

var url = "http://www.mundodasmensagens.com/";
var tipoId = 0;

var tipos = [
	"mundo",
	"reflexao",
	"vida",
	"impactantes",
	"pensadores"
];

var tipo = tipos[tipoId];


function getAll(id) {

	console.log("starting... " + tipo + " " +  id);

	var urlWithId = url +   id;

	request(urlWithId, function(error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log("parsing... " + id);
			parseAndExtractFrases(body, id);

		}
	});

}

function parseAndExtractFrases(html, id) {

	$ = cheerio.load(html);

	var elementsFrase = $("*[itemtype='http://schema.org/CreativeWork']");

	var frases = [];

	elementsFrase.each(function(i, elem) {

		frases.push({
			corpo: $('*[itemprop="text"]', elem).text(),
			autor: $(".autor_name", elem).text()
		});
		
	});

	Frase.create(frases, function (err) {
		if (err) return console.log(err);
		console.log("finished insertion of " + tipo + " " + id);
		if(id < 10){
			getAll(id + 1);
		}else{
			tipoId++;
			if(tipoId < tipos.length){
				tipo = tipos[tipoId];
				id = 1;
				getAll(id);
			}else{
				finalize();
			}
		}
	});
	
}


function finalize(){
	Frase.count({},function(err, count) { 
	
		console.log(count + " frases");
	
	});
}

Frase.onConnected = function(){
	
	getAll(1);
	
}