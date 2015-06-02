//crio a url onde vai ser buscado os posts
var url = location.protocol + "//" + location.hostname + ":3000/posts";

//passo a url como propriedade para o elemento raiz que é o Main
//e o renderizo dentro da tag main do HTML
React.render(<Main url={url} />, document.querySelector("main"));
 