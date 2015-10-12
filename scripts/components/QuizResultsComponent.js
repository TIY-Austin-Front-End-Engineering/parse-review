var React = require('react');
var QuizModel = require('../models/QuizModel');
var query = new Parse.Query(QuizModel);

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	    	quiz: null,
	        error: null
	    }
	},
	componentWillMount: function() {
		query
		.find().then(
			(quiz) => {
				this.setState({quiz: quiz});
			},
			(err) => {
				this.setState({error: err.message})
			}
		);
	},
	render: function() {
		return (
			<div>
			</div>
		);
	}
	
});