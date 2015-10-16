var React = require('react');
var CohortModel = require('../models/CohortModel');

module.exports= React.createClass ({
	getInitialState: function() {
		return {
			error: null
		};
	},
	render: function() {
		var errorElement = null;
		if(this.state.error) {
			errorElement = (<p className="error-message">{this.state.error}</p>)
			
		}
		return (
			<div className="reg-form-container">
				<form className="reg-form" onSubmit={this.onCreate}>
					<h2>Create Cohort</h2>	
					<label htmlFor="name">Cohort Name</label>
					<input className="u-full-width" ref="name" type="text" placeholder="name" id="name" />
					<label htmlFor="location">Location</label>
					<input className="u-full-width" ref="location" type="text" placeholder="location" id="location" />
					<label htmlFor="date">Date</label>
					<input className="u-full-width" ref="date" type="text" placeholder="Fall 2015" id="date" />
			)
	},
	onCreate: function(e) {
		e.preventDefault();
		var newCohort = new CohortModel();
		newCohort.save(
		{
			name: this.refs.name.value,
			location: this.refs.location.value,
			date: this.refs.date.value
		},
		{
			success: (u) => {
				console.log('test');
				this.forceUpdate();
				},
					error: (u, error) => {
						this.setState({
							error: error.message
					});
				}
			}
		);
	}


})