//This component registers new users.

var React = require('react');
var errorElement = null;
var teachPassword = null;
var CohortModel = require('../models/CohortModel')


module.exports= React.createClass ({
	getInitialState: function() {
		return {
			error: null
		};
	},
	render: function() {
		
		if (teachPassword){
			teachPassword=(<input className="u-full-width" ref="teach" type="password" placeholder="teacher password" />);
		}
		if (this.state.error) {
			errorElement = (<p className= "red">{this.state.error}</p>)
		}
		return (

			
			<div className="reg-form-container">
				<form className="reg-form" onSubmit={this.onRegister} >
				<h2 className="test">Register</h2>			
				
				<label htmlFor="firstName">First Name</label>
				<input className="u-full-width" ref="firstName" type="text" placeholder="Jill" id="firstName" />
				<label htmlFor="lastName">Last Name</label>
				<input className="u-full-width" ref="lastName" type="text" placeholder="Gates" id="lastName" />
				<label htmlFor="userName">User Name</label>
				<input className="u-full-width" ref="username" type="text" placeholder="user name" id="userName" />
				<label htmlFor="exampleEmailInput">Your Email</label>
				<input className="u-full-width" ref="email" type="email" placeholder="test@mailbox.com" id="exampleEmailInput" />
				<label htmlFor="password">Password</label>
				<input className="u-full-width" ref="password" type="password" placeholder="password" id="password" />
					
				<select onChange={this.reRender} ref="select">

									<option>Student</option>
									<option>Teacher</option>
								</select>
							
							{teachPassword}
							<button ref="button" className="button-primary" disabled={false}>Register</button>
							{errorElement}
						</form>
					</div>
			)
	},
	reRender:function(e){
		e.preventDefault();
		console.log('rerendering');
		this.forceUpdate();
		if(this.refs.select.value === 'Teacher'){
			teachPassword=true;
		} else{
			teachPassword=false;
		}
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
			var targetCohortModel = new CohortModel({objectId: this.props.cohortId});
			var user = new Parse.User();
			user.signUp(
				{
					firstName: this.refs.firstName.value,
					lastName: this.refs.lastName.value,
					username: this.refs.username.value,
					password: this.refs.password.value,
					email: this.refs.email.value,
					cohortId: targetCohortModel,
					teacher: teach
				},
				{
					success: (u) => {
						console.log('test');
					},
					error: (u, error) => {
						this.setState({
							error: error.message
						});
					}
				}
			);
			this.props.router.navigate('', {trigger: true});
		}
		
	}
});








