var React = require('react');
var Backbone = require('backbone');

module.exports = React.createClass({
	componentWillMount: function() {
		this.props.router.on('route', () => {
			this.forceUpdate();
		})
	},
	render: function() {
		var currentUser = Parse.User.current();
		var links = []; 
		if(currentUser && currentUser.get('teacher') === true) {
			links.push(<li><a href="#">Dashboard</a></li>);
			links.push(<li><a href="#">Create Quiz</a></li>);
			links.push(<li><a href="#">Log Out</a></li>);
			links.push(<li>{currentUser.get('firstname')} {currentUser.get('lastname')}</li>);
		}        
		else if(currentUser && currentUser.get('teacher') === false) {
			links.push(<li><a href="#">Take Quiz</a></li>);
			links.push(<li><a href="#">Log Out</a></li>);
			links.push(<li>{currentUser.get('firstname')} {currentUser.get('lastname')}</li>);
		}
		else {
			links.push(<li><a href="#register">Register</a></li>);
			links.push(<li><a href="#login">Log In</a></li>);
		}

		return (
			<nav>
				{links}
			</nav>
		);
	}
});