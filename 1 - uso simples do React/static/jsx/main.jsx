var TransitionGroup = React.addons.CSSTransitionGroup;

var Main = React.createClass({
   displayName: "Main",
   
   getInitialState: function(){
     
     this.getPostData();
     
     return {
         posts: []
     };
       
     
       
   },
   
   getPostData: function(){
      
     var getDataAgain = this.getPostData;
     fetch(this.props.url)
      .then(function(response){
            return response.json();
      })
      .then(function(obj){
          this.setState({
              posts: obj
          });
          setTimeout(getDataAgain, 1000);
      }.bind(this))
      .catch(function(){
         
         console.log(arguments);
      });
       
   },
   
   render: function(){
       console.log(this.state.posts);
       var posts = this.state.posts.map(function(post){
          return <Post key={post.uuid} post={post} />; 
       });
       
        return (
            <TransitionGroup transitionName="fade-in">
                {posts}
            </TransitionGroup>
        );
       
   }
    
});