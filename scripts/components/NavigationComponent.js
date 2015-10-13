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
			links.push(<div key="logout" className="nav-bar-button"><a href="#logout">Log Out</a></div>);
			links.push(<div key="dashboard" className="nav-bar-button"><a href="#dashboard">Dashboard</a></div>);
			links.push(<div key="createQuiz" className="nav-bar-button"><a href="#createQuiz">Create Quiz</a></div>);
			links.push(<div key="username" className="user-name-display">{currentUser.get('firstName')} {currentUser.get('lastName')}</div>);
		}
		//'else if' statement will only display links that are availble to students.
		else if(currentUser && currentUser.get('teacher') === false) {
			links.push(<div key="logout" className="nav-bar-button"><a href="#logout">Log Out</a></div>);
			links.push(<div key="username" className="nav-bar-button">{currentUser.get('username')}</div>);

			links.push(<div key="classAnalytics" className="nav-bar-button"><a href="#classAnalytics">Class Analytics</a></div>);
			links.push(<div key="takeQuiz" className="nav-bar-button"><a href="#takeQuiz">Take Quiz</a></div>);
			links.push(<div key="username" className="user-name-display">{currentUser.get('firstName')} {currentUser.get('lastName')}</div>);
		}
		//'else' statement will display links that are available if there is no one logged in.
		else {
			links.push(<div key="register" className="nav-bar-button"><a href="#register">Register</a></div>);
			links.push(<div key="login" className="nav-bar-button"><a href="#login">Log In</a></div>);
		}
		return(
			<nav className="nav-bar">
				<a href=""><img src="../../images/logo_pencil.png" className="logo"></img></a>
				{links}
			</nav>
		)
	}
});
