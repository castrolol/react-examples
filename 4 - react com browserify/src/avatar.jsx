var React = require("react"); 

var AVatar = React.createClass({
 
	getDefaultProps: function () {
	    return {
	        id: "invalido",
	        selected: false  
	    };
	},
 
	render: function(){
  		var className = "avatar";
  		if(this.props.selected){
  			className += " selected";
  		}
 
		return (
			<div className={className} onClick={this.props.onClick} >
				<img height="65" width="65" src={"/avatar/" + this.props.id } alt="Avatar" />
			</div>
		);
	}

});

module.exports = AVatar;