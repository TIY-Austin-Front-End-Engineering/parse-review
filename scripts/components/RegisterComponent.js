//This component registers new users.

var React = require('react');
var errorElement = null;
var teachPassword = null;


module.exports= React.createClass ({
	getInitialState: function() {
		return {
			error: null
		};
	},
	render: function() {
		
		if (teachPassword){
			console.log('teachy!');
			teachPassword=(<input className="u-full-width" ref="teach" type="password" placeholder="teacher password" />);
		}
		if (this.state.error) {
			errorElement = (<p className= "red">{this.state.error}</p>)
		}
		return (
			<div className="container">
				<div className="row">
					<div className="twelve columns">
						<form onSubmit={this.onRegister} className="form">
							<h2>Register</h2>
							
							<div className="row">
								<div className="twelve columns">
									<label htmlFor="firstName">First Name</label>
									<input className="u-full-width" ref="firstName" type="text" placeholder="Gill" id="firstName" />
								</div>
							</div>
							<div className="row">
								<div className="twelve columns">
									<label htmlFor="lastName">Last Name</label>
									<input className="u-full-width" ref="lastName" type="text" placeholder="Gates" id="lastName" />
								</div>
							</div>
							<div className="row">
								<div className="twelve columns">
									<label htmlFor="userName">User Name</label>
									<input className="u-full-width" ref="username" type="text" placeholder="user name" id="userName" />
								</div>
							</div>
							<div className="row">
								<div className="twelve columns">
								<label htmlFor="exampleEmailInput">Your Email</label>
								<input className="u-full-width" ref="email" type="email" placeholder="test@mailbox.com" id="exampleEmailInput" />
								</div>
							</div>
							<div className="row">
								<div className="twelve columns">
									<label htmlFor="password">Password</label>
									<input className="u-full-width" ref="password" type="password" placeholder="password" id="password" />
								</div>
							</div>
							<div>
								<select onChange={this.reRender} ref="select">
									<option>Student</option>
									<option>Teacher</option>
								</select>
							</div>
							{teachPassword}
							<button ref="button" className="button-primary" disabled={false}>Register</button>
							{errorElement}
						</form>
					</div>
					
				</div>
			</div>
			)
	},
	reRender:function(e){
		e.preventDefault();
		console.log('rerendering');
		teachPassword=true;
		this.forceUpdate();
	},
	onRegister: function(e) {
		e.preventDefault();
		this.refs.button.disabled = true;
		var that=this;
		var teach = false;
		
		if (this.refs.select.value=='Teacher'){
			
			if (this.refs.teach.value==='teacher'){
				console.log('yay!!!')
				console.log(this.refs.teach.value);
				teach=true;
				var user = new Parse.User();
				user.signUp(
					{
						firstName: this.refs.firstName.value,
						lastName: this.refs.lastName.value,
						username: this.refs.username.value,
						password: this.refs.password.value,
						email: this.refs.email.value,
						teacher: teach
					},
					{
						success: (u) => {
							console.log('test');
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
			else{
				console.log('no beans');
				errorElement = (<p className= "red">Incorrect Teacher Password</p>);
				that.forceUpdate();
			}
		}
		else{
			var user = new Parse.User();
			user.signUp(
				{
					firstName: this.refs.firstName.value,
					lastName: this.refs.lastName.value,
					username: this.refs.username.value,
					password: this.refs.password.value,
					email: this.refs.email.value,
					teacher: teach
				},
				{
					success: (u) => {
						console.log('test');
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
		
	}
});








