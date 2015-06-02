var url = location.protocol + "//" + location.hostname + ":3000/posts";

React.render(<Main url={url} />, document.querySelector("main"));
 