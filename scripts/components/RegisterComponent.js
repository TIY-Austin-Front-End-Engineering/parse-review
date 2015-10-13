//This component registers new users.

var React = require('react');

module.exports= React.createClass ({
	getInitialState: function() {
		return {
			error: null
		};
	},
	render: function() {
		var errorElement = null;
		if (this.state.error) {
			errorElement = (<p className= "red">{this.state.error}</p>)
		}
		return(
				<form onSubmit={this.onRegister}>
					<h2>Register</h2>
					{errorElement}
					<div className="row">
						<div className="six columns">
							<label htmlFor="firstName">First Name</label>
							<input className="u-full-width" ref="firstName" type="text" placeholder="Jill" id="firstName" />
						</div>
					</div>
					<div className="row">
						<div className="six columns">
							<label htmlFor="lastName">Last Name</label>
							<input className="u-full-width" ref="lastName" type="text" placeholder="Gates" id="lastName" />
						</div>
					</div>
					<div className="row">
						<div className="six columns">
							<label htmlFor="userName">User Name</label>
							<input className="u-full-width" ref="username" type="text" placeholder="user name" id="userName" />
						</div>
					</div>
					<div className="row">
						<div className="six columns">
							<label htmlFor="exampleEmailInput">Your Email</label>
							<input className="u-full-width" ref="email" type="email" placeholder="test@mailbox.com" id="exampleEmailInput" />
						</div>
					</div>
					<div className="row">
						<div className="six columns">
							<label htmlFor="password">Password</label>
							<input className="u-full-width" ref="password" type="password" placeholder="password" id="password" />
						</div>
					</div>
					<button className="button-primary">Register</button>
				</form>
			)
	},	
	onRegister: function(e) {
		e.preventDefault();
		var user = new Parse.User();
		user.signUp(
			{
				firstName: this.refs.firstName.value,
				lastName: this.refs.lastName.value,
				username: this.refs.username.value,
				password: this.refs.password.value,
				email: this.refs.email.value
			},
			{
				success: (u) => {
					this.props.router.navigate('', {trigger: true});
				},
				error: (u, error) => {
					this.setState({
						error: error.message
					});
				}
			}
		);
	}
});








