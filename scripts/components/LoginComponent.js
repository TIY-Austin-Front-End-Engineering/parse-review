// This is for the Log in component that lets users access their account.
var React = require('react');
var ReactDOM = require('react-dom');

// Creating a new React component that lets the user log in into their account. If errors arise, they will be redirected using an error message.
module.exports = React.createClass({ 
	getInitialState: function() {
		return {
			error: null
		};
	},// if the user does not type in any information this function will prompt them to inout their username and password
	render: function() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (<p className="error-message">{this.state.error})</p>)

		}
		return(

			//Log In form starts here with username and password required
			<form onSubmit={this.onLogin}>
				<h2>Login</h2>
				<div className="row">
					<div className="six columns">
						<label htmlFor="userName" >User Name</label>
						<input className="u-full-width" ref="userName" type="text" placeholder="user name" id="userName" />
					</div>
				</div>
				<div className="row">
					<div className="six columns">
						<label htmlFor="userName" >Password</label>
						<input className="u-full-width" ref="password" type="password" placeholder="password" id="password" />
					</div>
					<div className="row">
						<button className="button-primary">Log In</button>
					</div>
				</div>
			</form>
		);
	},
	// Function to log in user which uses Parse for as a server with the users information
	onLogin: function(e) {
		e.preventDefault();
		console.log(this.refs.password.value)
		var user = new Parse.User();
		Parse.User.logIn(
			this.refs.userName.value,
			this.refs.password.value,
			{
				//routes user to home page when they successfully log in
				success: (u) => {
					this.props.router.navigate('', {trigger: true})
				},//gives user error message when they enter in no/wrong info
				error: (u, error) => {
					this.setState({
						error: error.message
					});
				}
			}	
		)
	}
})