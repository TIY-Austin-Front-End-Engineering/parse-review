var React = require('react');
var Backbone = require('backbone');
var moment = require('moment');

module.exports = React.createClass({
  render: function() {
	return(
		<tbody>
			<tr>
				<td>{this.props.student.get('firstName')} {this.props.student.get('lastName')}</td>
				<td>{this.props.student.present}</td>
				<td>{this.props.student.timeStarted !== '-' ? moment(this.props.student.timeStarted).format('MMMM Do, h:mm a') : '-'}</td>
			</tr> 
		</tbody>
	)
	}
})