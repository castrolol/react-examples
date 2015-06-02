//aqui eu crio o componente Post

var Post = React.createClass({
   displayName: "Main",
   
   //metodo de renderização do componente
   render: function(){
	   //uso a prop post para completar os valores de cara post
		return (
			<div className="post">
				<div className="content">
			 		<div className="frase">
			 			{this.props.post.frase}
			 		</div>
			 		<span className="autor-post">
			 			{this.props.post.autor}
			 		</span>
				</div>
			</div>
		);
	   
   }
	
});