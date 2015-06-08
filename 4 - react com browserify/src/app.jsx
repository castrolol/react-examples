var React = require("react"); 
var ComentarioContainer = require("./comentario-editor");
var ComentarioLista = require("./comentario-lista");
var server = require("./server")
 
var App = React.createClass({

	getInitialState: function () {
	  
		this.getComentarios();

	     return {
	        comentarios: []

	    };

	},

	getComentarios: function(){

		server.get("/comentarios", function(err, comentarios){

			if(err) return console.log(err);
		 
			this.setState({
	    		comentarios: comentarios
	    	});
	    	setTimeout(this.getComentarios, 1000);

	    }.bind(this));
	    
	},

	handleComentario: function(comentario){

		server.post("/comentario", comentario, function(){
			console.log(comentario);
		});

	},

	render: function(){
	  	 
		return (
			<div className="container-comentario">	
				<ComentarioLista comentarios={this.state.comentarios} />
				<ComentarioContainer onComentarioEnviado={this.handleComentario}  />
			 </div>	
		);

	}

});

 
React.render( <App />, document.querySelector("main"));