var React = require("react"); 
var Avatar = require("./avatar");
var server = require("./server")

var AvatarLista = React.createClass({

	getInitialState: function(){
		
		server.get("/avatars", function(err, avatars){

			if(err) return console.log(err);
			
			this.setState({
				avatars: avatars.map(function(avatar){
					return avatar.avatarId;
				})
				
			});
			setTimeout(function(){
				
				if(!this.state.avatar){
					this.handleSelection(avatars[0].avatarId)();
				}
				
			}.bind(this), 100)

	    }.bind(this));
		  
		return {
			avatars: [],
			isOpen: false,
			selected: this.props.initialAvatar || null
		}
	},
 

	getDefaultProps: function () {
	    return {
			avatares: []
	    };
	},

	handleChangeImage: function(){

		this.setState({
			isOpen: true
		});

	},

	handleSelection: function(idAvatar){

		return function(){

			this.setState({
				isOpen: false,
				selected: idAvatar
			});
			
			if(this.props.onChange){
				this.props.onChange(idAvatar);
			}

		}.bind(this);

	},

	render: function(){

		if(!this.state.isOpen){

			return <Avatar id={this.state.selected} onClick={this.handleChangeImage} />;

		}

		var avatares = this.state.avatars.map(function(idAvatar){
			var isSelected = idAvatar === this.state.selected;
			return (<Avatar id={idAvatar} selected={isSelected} onClick={this.handleSelection(idAvatar)} />);

		}.bind(this)); 

		return (<div className="lista-avatars"> 
			{avatares} 
		</div>);
	}

});

module.exports = AvatarLista;
