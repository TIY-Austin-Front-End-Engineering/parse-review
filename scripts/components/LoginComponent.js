var React = require('react');
var ReactDOM = require('react-dom');
 
module.exports = react.createClass({
	getInitialState: function() {
		return(
			error: null;
		)
	},
	render: function() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (<p className="error-message">{this.state.error})</p>)

		}
		return(
			<form onLogin={this.onLogin}>
				<h2>Login</h2>
				<div className="row">
					<div className="six columns">
						<label for="userName" >User Name</label>
						<input className="u-full-width" ref="userName" type="text" placeholder="user name" id="userName" />
					</div>
				</div>
				<div className="row">
					<div className="six columns">
						<label for="userName" >Password</label>
						<input className="u-full-width" ref="password" type="password" placeholder="password" id="password" />
					</div>
				</div>
			)
	},
	onLogin: function(e) {
		e.preventDefault();
		var user = new Parse.User();
		Parse.User.login(
			{
				this.refs.userName.value,
				this.refs.password.value
			},
			{
				success: (u) => {
					this.props.router.navigate('', {trigger: true})
			},
				error: (u, error) => {
					this.setState({
						error: error.message
					})
				}
			}	
		)
	}
})