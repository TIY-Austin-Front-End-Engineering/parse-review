//This is the navigation component. The router has been passed in as a property.
var React = require('react');
var Backbone = require('backbone');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			hamburgerOpen: false	
		}

	},
	componentWillMount: function() {
		this.props.router.on('route', () => {
			this.forceUpdate();
		})
	},
	render: function() {
		console.log('render', this.state.hamburgerOpen);
		var currentUser = Parse.User.current();
		var links = [];
		var name = [];
		//'if' statement will show all the links including the ones only available to teachers.
		if(currentUser && currentUser.get('teacher') === true) {
			links.push(<a href="#logout" key="logout"><div className="nav-bar-button">Log Out</div></a>);
			links.push(<a href="#dashboard" key="dashboard"><div className="nav-bar-button">Dashboard</div></a>);
			links.push(<a href="#createQuiz" key="createQuiz"><div className="nav-bar-button">Create Quiz</div></a>);
			name.push(<div key="username" className="user-name-display">{currentUser.get('firstName')} {currentUser.get('lastName')}</div>);
		}
		//'else if' statement will only display links that are availble to students.
		else if(currentUser && currentUser.get('teacher') === false) {
			links.push(<a href="#logout" key="logout"><div className="nav-bar-button">Log Out</div></a>);
			links.push(<a href="#quizList" key="takeQuiz"><div className="nav-bar-button">Take Quiz</div></a>);
			name.push(<div key="username" className="user-name-display">{currentUser.get('firstName')} {currentUser.get('lastName')}</div>);
		}
		//'else' statement will display links that are available if there is no one logged in.
		else {
			links.push(<a href="#register" key="register"><div className="nav-bar-button">Register</div></a>);
			links.push(<a href="#login" key="login"><div className="nav-bar-button">Log In</div></a>);
		}
		// create class for displaying burger
		var hamburgerListClass = 'closed';
		if (this.state.hamburgerOpen) {
			hamburgerListClass = 'open';
		};
		// render html elements
		return(
			<nav className="nav-bar">
				<div id="hamburger-list" className={hamburgerListClass}>
					{links}
				</div>
				<div id="hamburger" className="hamburger">
					<img onClick={this.hamboiga} className="hamburger-image" src="../../images/hamburger.png"></img>
				</div>
				<a href="" id="logo-container"><img src="../../images/logo_pencil.png" className="logo"></img></a>
				{name}
				<div className="beniz">
					{links}
				</div>
			</nav>
		)},
		// function to hide and show burger
		hamboiga: function () {
			this.setState ({hamburgerOpen: !this.state.hamburgerOpen});
		}
});
