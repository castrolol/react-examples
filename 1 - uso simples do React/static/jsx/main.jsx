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
   //metodo de renderização do componente
   render: function(){
   
       //aqui eu crio para cara post no state
       //um component pos e adiciono e passo o 
       //objeto post como propriedade
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