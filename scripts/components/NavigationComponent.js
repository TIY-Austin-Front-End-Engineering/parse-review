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
			links.push(<a href="#logout"><div key="logout" className="nav-bar-button">Log Out</div></a>);
			links.push(<a href="#dashboard"><div key="dashboard" className="nav-bar-button">Dashboard</div></a>);
			links.push(<a href="#createQuiz"><div key="createQuiz" className="nav-bar-button">Create Quiz</div></a>);
			links.push(<div key="username" className="user-name-display">{currentUser.get('firstName')} {currentUser.get('lastName')}</div>);
		}
		//'else if' statement will only display links that are availble to students.
		else if(currentUser && currentUser.get('teacher') === false) {
			links.push(<a href="#logout"><div key="logout" className="nav-bar-button">Log Out</div></a>);
			links.push(<a href="#takeQuiz"><div key="takeQuiz" className="nav-bar-button">Take Quiz</div></a>);
			links.push(<div key="username" className="user-name-display">{currentUser.get('firstName')} {currentUser.get('lastName')}</div>);
		}
		//'else' statement will display links that are available if there is no one logged in.
		else {
			links.push(<a href="#register"><div key="register" className="nav-bar-button">Register</div></a>);
			links.push(<a href="#login"><div key="login" className="nav-bar-button">Log In</div></a>);
		}
		return(
			<nav className="nav-bar">
				<div id="hamburger-list">
					{links}
				</div>
				<div id="hamburger" className="hamburger">
					<img onClick={this.hamboiga} className="hamburger-image" src="../../images/hamburger.png"></img>
				</div>
				<a href="" id="logo-container"><img src="../../images/logo_pencil.png" className="logo"></img></a>
				<div className="beniz">
					{links}
				</div>
			</nav>
		)},
		hamboiga: function () {
			var hamburger = document.getElementById('hamburger-list');
			if(hamburger.style.display == 'block'){
				hamburger.style.display = 'none';
			}
			else {
				hamburger.style.display = 'block';
			}
		}
});
