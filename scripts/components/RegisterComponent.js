var React = require('react');

module.exports= React.createClass ({
	getInitialState: function() {
	    return {
	          error: null;
	    };
	},
	render: function() {
		var errorElement = null;
		if (this.state.error) {
			errorElement = (<p className= "error-message">{this.state.error}</p>)
		}
		return(
				<form onSubmit={this.onRegister}>
					<h2>Register</h2>
					<div className="row">
					    <div className="six columns">
					      <label for="firstName">First Name</label>
					      <input className="u-full-width" ref="firstName" type="text" placeholder="Jill" id="firstName" />
					   	</div>
				  	</div>
				  	<div className="row">
					    <div className="six columns">
					      <label for="lastName">Last Name</label>
					      <input className="u-full-width" ref="lastName" type="text" placeholder="Gates" id="lastName" />
					   	</div>
				  	</div>
				  	<div className="row">
					    <div className="six columns">
					      <label for="userName">User Name</label>
					      <input className="u-full-width" ref="userName" type="text" placeholder="user name" id="userName" />
					   	</div>
				  	</div>
				  	<div className="row">
					    <div className="six columns">
					      <label for="exampleEmailInput">Your Email</label>
					      <input className="u-full-width" ref="email" type="email" placeholder="test@mailbox.com" id="exampleEmailInput" />
					   	</div>
				  	</div>
				  	<div className="row">
					    <div className="six columns">
					      <label for="password">Password</label>
					      <input className="u-full-width" ref="password" type="password" placeholder="password" id="password" />
					   	</div>
				  	</div>
				  <input className="button-primary" type="submit" value="Submit"  />
				</form>
			)
	},	
	onRegister: function(e){
		e.preventDefault();
		var user = new Parse.User();
		user.signUp(
			{
				firstName: this.refs.firstName.value,
				lastName: this.refs.lastName.value,
				userName: this.refs.userName.value,
				email: this.refs.email.value,
				password: this.refs.password.value
			},
			{
				success: (u) => {
					this.props.router.navigate('', {trigger: true});
				},
				error: (u, error) => {
					this.setState({
						error: error.message
					})
				} 
			}
		)
	}

});









