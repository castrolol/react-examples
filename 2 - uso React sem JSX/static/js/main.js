var TransitionGroup = React.addons.CSSTransitionGroup;

//Componente main, vai representar toda a pagina
var Main = React.createClass({
   displayName: "Main",
   
   //metodo usado para obter o estado inicial do componente
   //aqui pode ser usado props para inicializar caso
   //necessario
   getInitialState: function(){
     
     this.getPostData();
     
     return {
         posts: []
     };
       
     
       
   },
   //funcao criada para buscar os dados do servidor
   //de tempos em tempos
   getPostData: function(){
 
     fetch(this.props.url)
      .then(function(response){
          return response.json();
      })
      .then(function(posts){
                    
          this.setState({
              posts: posts
          });

          setTimeout(this.getPostData, 1000);

      }.bind(this))
      .catch(function(err){
        console.log(err);
        setTimeout(this.getPostData, 1000);
      });
       
   },
   //metodo de renderização do componente
   render: function(){
   
       //aqui eu crio para cara post no state
       //um component pos e adiciono e passo o 
       //objeto post como propriedade
       var posts = this.state.posts.map(function(post){
          return React.createElement(Post, { key: post.uuid, post: post }); 
       });
       
        return React.createElement(TransitionGroup, { transitionName: "fade-in" }, posts);
       
   }
    
});