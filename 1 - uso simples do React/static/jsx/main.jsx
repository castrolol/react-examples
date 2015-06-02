var Main = React.createClass({
   displayName: "Main",
   
   getInitialState: function(){
     
     return {
         posts: []
     };
       
     this.getPostData();
       
   },
   
   getPostData: function(){
     var setState = this.setState;
     fetch(this.props.url)
      .then(function(response){
          return response.json();
      })
      .then(function(obj){
          setState({
              posts: obj
          });
          setTimeout(this.getPostData, 10000);
      });
       
   },
   
   render: function(){
       
       var posts = this.state.posts.map(function(post){
          return <Post key={post.uuid} posts={post} />; 
       });
       
        return (
            <div>
                {posts}
            </div>
        );
       
   }
    
});