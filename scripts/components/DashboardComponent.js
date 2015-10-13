'use strict';
var React = require('react');

module.exports = React.createClass({
	render: function() {
		return(
			<div className="dashboard-container">
				<div className="dashboard-title">
					<h1>Analytics Dashboard</h1>
				</div>
				<a href="#studentAnalytics"><img src="../../images/grades.png" /></a>
				<h5>Student Averages</h5>
				<a href="#classAnalytics"><img src="../../images/quiz.png"/></a>
				<h5>Quiz Averages</h5>
				<a href="#attendance"><img src="../../images/attendance.png"/></a>
				<h5>Student Attendance</h5>
			</div>

		)
	}
})