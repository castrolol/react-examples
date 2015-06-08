var React = require("react/addons");
var AvatarLista= require("./avatar-lista");

var ComentariosContainer = React.createClass({
	mixins: [React.addons.LinkedStateMixin],

	getInitialState: function () {
	    return {
	        editando: false,
	        textoComentario: "" ,
	        autor: ""
	    };
	},	

	getDefaultProps: function () {
	    return { 
	        ehResposta: false,
	        onComentarioEnviado: function(){}
	    };
	},

	handleResponder: function(e){

		e.preventDefault();

		this.setState({
			editando: true
		});

	},

	handleAvatarChange: function(){

	},

	handleEnviarComentario: function(){

		this.props.onComentarioEnviado({
			data: new Date(),
			texto: this.state.textoComentario,
			autor: this.state.autor,
			avatar: this.refs.avatars.getSelected(),
			comentarios: []
		});



		this.setState({
			textoComentario: "",
			editando: false
		});

	},



	render: function() {


		if(this.props.ehResposta && !this.state.editando){
			return ( <a className="container-rodape" href="#" onClick={this.handleResponder} >responder</a> );
		}

		return (	
				
			<div className="container-rodape">
				<hr />
				<div>
					{this.props.ehResposta ?
						 <h4>Sua resposta</h4> : 
						 <h2>Deixe seu comentário</h2>
					}
					<label>
						Seu Nome: 
						<input type="text" valueLink={this.linkState('autor')} />
					</label>
					<AvatarLista ref="avatars" />
					<textarea  valueLink={this.linkState('textoComentario')} />
					<button onClick={this.handleEnviarComentario} >
						Enviar 
					</button>
				</div>
			</div>
		 
		); 
	}

});

module.exports = ComentariosContainer;