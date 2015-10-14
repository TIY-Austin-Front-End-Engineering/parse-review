var React = require('react');
var QuizModel = require('../models/QuizModel');
var PostQuestionComponent = require('./PostQuestionComponent');

module.exports  = React.createClass({
		getInitialState: function(){
		return{
			quiz: null
		};
	},
	componentWillMount: function(){
		var query = new Parse.Query(QuizModel);
		query.get(this.props.quizId).then(
			(quiz) =>{
				this.setState({quiz:quiz})
				console.log(quiz);
			});
	},
	render: function() {
		return (
			<div>
				<form>
					<input type="text" ref="quizName" placeholder="Quiz Title"/>
					<input type="date" ref="dateToStart" placeholder="date to starts" />
					<input type="date" ref="dateExpire" placeholder="date to expire" />
					<PostQuestionComponent />
				</form>
			</div>
		);
	}
});

