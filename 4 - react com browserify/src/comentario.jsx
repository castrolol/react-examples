var React = require("react");
var Avatar = require("./avatar");
var ComentariosContainer = require("./comentarios-container");

var ComentarioLista = require("./comentario-lista");

var server = require("./server");

var Comentario = React.createClass({


	getDefaultProps: function () {
	    return {
	        nivel: 0  
	    };
	},

	componentDidMount: function() {
		this.atualizarData();
	},

	atualizarData: function(){
		this.forceUpdate();
		setTimeout(this.atualizarData, 60000);
	},

	handleResposta: function(resposta){

		var id = this.props.model.key;
		var url = "/comentario/" + id + "/resposta";
		console.log(url);
		server.post(url, resposta, function(){
			console.log(arguments);
		});

	},

	render: function(){
		var model = this.props.model;
		
		if(!model){
			return <div />;
		}
		var tempoAtras = moment(model.data).fromNow();

		return (
			<div className="comentario">
				<Avatar id={model.avatar} />
				<div className="balao">
					<div className="titulo">
						<h6 className="nome">
							{model.autor}
						</h6>
						<span>{"há " + tempoAtras}</span>				
					</div>
					<div className="conteudo">
						{model.texto}	
					</div>
					{ this.props.ehResposta ?
						null :
						<ComentariosContainer ehResposta={true}  onComentarioEnviado={this.handleResposta}   />
					}
				</div>
				{this.props.children}
			</div>
		);
	}

});

module.exports = Comentario;