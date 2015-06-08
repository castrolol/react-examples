var React = require("react");
var Comentario = require("./comentario");

var ComentarioLista = React.createClass({

	getDefaultProps: function () {
	    return {
			ehResposta: false,
			comentarios: []  
	    };
	}, 
	
	render: function(){
		
		console.log(this.props);

		var comentarios = this.props.comentarios.map(function(comentario){

			return (
				<Comentario 
						ehResposta={this.props.ehResposta}
						key={comentario.key} 
						model={comentario} > 
						{ this.props.ehResposta ?
							null :
							<ComentarioLista comentarios={comentario.comentarios} ehResposta={true}  />
						}
				</Comentario>
			);

		}.bind(this)); 

		return <div> {comentarios} </div>;
	}

});

module.exports = ComentarioLista;
