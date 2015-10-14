//The StudentAnalyticsComponent:
//Will display student average scores.
//Display the quizes and related students.
//Show quiz start and end time.
//The needed properties are the StudentAnswerModel and the QuestionModel for determining the correctly associated questions and answers.

var React = require('react');
var ReactDOM = require('react-dom');
var QuizResultsComponent = require('./QuizResultsComponent');
var QuizModel = require('../models/QuizModel');
var QuestionModel = require('../models/QuestionModel');
var StudentAnswerModel = require('../models/StudentAnswerModel');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			studentCorrect: null,
			allQuizzes: [],
			allStudentAverages: [],
		};
	},
	componentWillMount: function() {
		console.log('test');
		var quizQuery = new Parse.Query(QuizModel);
		quizQuery.find().then(
		(quiz) => {
			this.setState({allQuizzes: quiz});
			console.log(this.state.allQuizzes)
		},
		(err) => {
			console.log(err);
		}
	);

	},
	render: function() {
		console.log('it works');
		return (
			<div>
				<h1>Student Analytics</h1>
			</div>
		);
	}
});


