//aqui eu crio o componente Post

var Post = React.createClass({
   displayName: "Main",
   
   //metodo de renderização do componente
   render: function(){
	   //uso a prop post para completar os valores de cara post
		return (
			<blockquote >
				<cite>
			 		{this.props.post.frase}
			 	</cite>
			 	<div className="autor">
			 		{this.props.post.autor}
			 	</div>
		 	</blockquote>
		);
	   
   }
	
});