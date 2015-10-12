var React = require('react');
var Backbone = require('backbone');
var AttendanceRowComponent = require('./AttendanceRowComponent');


module.exports = React.createClass({
	render: function() {
		var showComponent = null;
		var attendanceBodyData = this.quiz.map(function(student) {
			<AttendanceRowComponent student={student} date={this.quiz}/>
		})
		var attendance = (
			<table className="u-full-width">
				<h1>Teacher Name - Quiz Name</h1>
  				<thead>
  					<tr>
  						<th>Day Administered</th>
  						<th>Student Name</th>
  						<th>Time Started</th>
  					</tr>
  				</thead>
  				{attendanceBodyData}
			</table>
		)
		var accessDenied = (
			<h1>Must have Admin Permission to view attendance.</h1>
			)
		Parse.User.current().get('teacher') ? showComponent = attendance : showComponent = accessDenied;
		return (
			<div>
				{showComponent}
			</div>
		)
	}
})