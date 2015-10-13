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
			links.push(<li className="nav-bar-button"><a href="#">Dashboard</a></li>);
			links.push(<li className="nav-bar-button"><a href="#">Create Quiz</a></li>);
			links.push(<li className="nav-bar-button"><a href="#">Log Out</a></li>);
			links.push(<li className="nav-bar-button">{currentUser.get('userName')}</li>);
		}
		else if(currentUser && currentUser.get('teacher') === false) {
			links.push(<li className="nav-bar-button"><a href="#">Take Quiz</a></li>);
			links.push(<li className="nav-bar-button"><a href="#">Log Out</a></li>);
			links.push(<li className="nav-bar-button">{currentUser.get('userName')}</li>);
		}
		else {
			links.push(<li className="nav-bar-button"><a href="#register">Register</a></li>);
			links.push(<li className="nav-bar-button"><a href="#login">Log In</a></li>);
		}
		return( 
			<nav className="nav-bar">
				<ul>
					<li className="logo"></li>
					{links}
				</ul>
			</nav>
			)
	}
});