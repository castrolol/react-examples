var Post = React.createClass({
   displayName: "Main",
   
   
   render: function(){
	   
		return (
			<div className="post">
		 		<div className="frase">
		 			{this.props.post.frase}
		 		</div>
		 		<span className="autor-post">
		 			{this.props.post.autor}
		 		</span>
			</div>
		);
	   
   }
	
});