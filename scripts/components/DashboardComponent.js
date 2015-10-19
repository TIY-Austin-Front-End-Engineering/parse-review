//this component is the dashboard for the analytics componenets. 

'use strict';
var React = require('react');

module.exports = React.createClass({
	render: function() {
		return(
			<div className="container">
				<div className="dashboard-title">
					<h1>{Parse.User.current().get('username')+'\'s'} Dashboard</h1>
				</div>
				<div className="dashboard-container">
					<div className="row">
						<div className="six columns">
							<a href="#createQuiz">
								<div className="need">
									<img src="../../images/check7.png"/>
									<h5>Create A Quiz</h5>
								</div>
							</a>
						</div>
						<div className="six columns">
							<a href="#studentAnalytics">
								<div className="need">
									<img src="../../images/data-analytics.png"/>
									<h5>Student Averages</h5>
								</div>
							</a>
						</div>
					</div>
					<div className="row">
						<div className="six columns">
							<a href="#classAnalytics">
								<div className="need">
									<img src="../../images/quiz.png"/>
									<h5>Quiz Averages</h5>
								</div>
							</a>
						</div>
						<div className="six columns">
							<a href="#attendance">
								<div className="need">
									<img src="../../images/verification25.png"/>
									<h5>Student Attendance</h5>
								</div>
							</a>
						</div>
					</div>
					<div className="row">
						<div className="six columns">
							<a href="#createCohort">
								<div className="need">
									<img src="../../images/students5.png"/>
									<h5>Cohorts</h5>
								</div>
							</a>
						</div>
					</div>
				</div>
			</div>

		)
	}
})