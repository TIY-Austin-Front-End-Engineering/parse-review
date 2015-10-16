//this component creates a new cohort and saves it to the CohortModel


var React = require('react');
var CohortModel = require('../models/CohortModel');

module.exports= React.createClass ({
	getInitialState: function() {
		return {
			error: null,
			cohorts: []
		};
	},
	componentWillMount: function() {
		var cohortQuery = new Parse.Query(CohortModel);
		cohortQuery.find().then(
			(cohort) => {
				this.setState({cohorts: cohort});
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render: function() {
		var errorElement = null;
		var cohortList = this.state.cohorts.map(function(cohort) {
			return (
				<div>
					<p>{cohort.get('name')} - {cohort.get('location')} - {cohort.get('date')}</p>
					<p>tiy-austin-front-end-engineering.github.io/#cohortRegister/{cohort.id}</p>
				</div>
				)
		})
		if(this.state.error) {
			errorElement = (<p className="error-message">{this.state.error}</p>)
			
		}
		return (
			<div className="reg-form-container container">
				<div className="row">
					<form className="reg-form four columns" onSubmit={this.onCreate}>
						<h2>Create Cohort</h2>	
						<label htmlFor="name">Cohort Name</label>
						<input className="u-full-width" ref="name" type="text" placeholder="name" id="name" />
						<label htmlFor="location">Location</label>
						<input className="u-full-width" ref="location" type="text" placeholder="location" id="location" />
						<label htmlFor="date">Date</label>
						<input className="u-full-width" ref="date" type="text" placeholder="Fall 2015" id="date" />
						{errorElement}
						<button ref="button" className="button-primary" disabled={false}>Create Cohort</button>
					</form>
					<div className="seven columns">
						{cohortList}
					</div>	
				</div>	
			</div>
		);
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