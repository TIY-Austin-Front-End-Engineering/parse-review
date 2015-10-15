//this component is the dashboard for the analytics componenets. 

'use strict';
var React = require('react');

module.exports = React.createClass({
	render: function() {
		return(
			<div className="dashboard-container">
				<div className="dashboard-title">
					<h1>{Parse.User.current().get('username')+"'s"} Dashboard</h1>
				</div>
				<a href="#createQuiz">
					<div className="dashboard-links">
						<img src="../../images/check7.png"/>
						<h5>Create A Quiz</h5>
					</div>
				</a>
				<a href="#studentAnalytics">
					<div className="dashboard-links">
						<img src="../../images/grades.png"/>
						<h5>Student Averages</h5>
					</div>
				</a>
				<a href="#classAnalytics">
					<div className="dashboard-links">
						<img src="../../images/quiz.png"/>
						<h5>Quiz Averages</h5>
					</div>
				</a>
				<a href="#attendance">
					<div className="dashboard-links">
						<img src="../../images/attendance.png"/>
						<h5>Student Attendance</h5>
					</div>
				</a>
				
			</div>

		)
	}
})