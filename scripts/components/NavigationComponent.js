//This is the navigation component. The router has been passed in as a property.
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
		//'if' statement will show all the links including the ones only available to teachers.
		if(currentUser && currentUser.get('teacher') === true) {
			links.push(<div key="teacher" className="nav-bar-button"><a href="#dashboard">Dashboard</a></div>);
			links.push(<div key="teacher" className="nav-bar-button"><a href="#creatQuiz">Create Quiz</a></div>);
			links.push(<div key="teacher" className="nav-bar-button"><a href="#logout">Log Out</a></div>);
			links.push(<div key="teacher" className="nav-bar-button">{currentUser.get('username')}</div>);
		}
		//'else if' statement will only display links that are availble to students. 
		else if(currentUser && currentUser.get('teacher') === false) {
			links.push(<div key="student" className="nav-bar-button"><a href="#takeQuiz">Take Quiz</a></div>);
			links.push(<div key="student" className="nav-bar-button"><a href="#logout">Log Out</a></div>);
			links.push(<div key="student" className="nav-bar-button">{currentUser.get('username')}</div>);
		}
		//'else' statement will display links that are available if there is no one logged in.
		else {
			links.push(<div key="noUser" className="nav-bar-button"><a href="#register">Register</a></div>);
			links.push(<div key="noUser" className="nav-bar-button"><a href="#login">Log In</a></div>);
		}
		return( 
			<nav className="nav-bar">
				<div className="logo"></div>
				{links}
			</nav>
			)
	}
});