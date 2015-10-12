var React = require('react');
var Backbone = require('backbone');

module.exports = React.createClass({
  render: function() {
    return(
        <tbody>
            <tr>
                <td>{this.props.quiz.get('createdAt')}</td>
                <td>{this.props.student.get('firstName') {this.props.student.get('lastName')}</td>
                <td>{(this.props.student.get('timeStarted')) ? this.props.student.get('timeStarted') : 'ABSENT'}</td>
            </tr> 
        </tbody>
    )
    }
})