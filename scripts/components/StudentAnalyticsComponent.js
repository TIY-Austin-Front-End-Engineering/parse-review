//The StudentAnalyticsComponent:
//Will display student average scores.
//Display the quizes and related students.
//Show quiz start and end time.
//The needed properties are the StudentAnswerModel and the QuestionModel for determining the correctly associated questions and answers.
var QuizResultsComponent = require('./components/QuizResultsComponent');
var QuizModel = requrie('../models/QuizModel');
var QuestionModel = require('../models/QuestionModel');
var StudentAnswerModel = require('../models/StudentAnswerModel');
var query = new Parse.Query(StudentAnswerModel);
var React = require('react');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			studentCorrect: null,
			allQuizzes: [],


		};
	},
	componentWillMount: function() {

	},
	render: function() {
		return (
			console.log('it works')
		);
	},
});

