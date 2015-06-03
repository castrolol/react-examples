//aqui eu crio o componente Post

var Post = React.createClass({
   displayName: "Main",
   
   //metodo de renderização do componente
   render: function(){
	   //uso a prop post para completar os valores de cara post

	   var cite = React.createElement("cite", null, this.props.post.frase);
	   var autor = React.createElement("div", { className: "autor"}, this.props.post.autor);

		return React.createElement("blockquote", null, cite, autor);
	   
   }
	
});