//child component to AttendanceComponent, requires student list to passed in through parrent component

var React = require('react');
var Backbone = require('backbone');
var moment = require('moment');

module.exports = React.createClass({
  render: function() {
	return(
		<tbody>
			<tr>
				<td>{this.props.student.get('lastName')}, {this.props.student.get('firstName')}</td>
				<td>{this.props.student.present}</td>
				<td>{this.props.student.timeStarted !== '-' ? moment(this.props.student.timeStarted).format('MMMM Do, h:mm a') : '-'}</td>
			</tr> 
		</tbody>
	)
	}
})