/*
 *	Class Analytics Component
 *
 *	requires:
 *		React
 *		Quiz Model
 *			quizTitle: string
 *			totalQuestions: number
 *
 *		QuestionModel
 * 			quizId: pointer
 *			objectId
 *
 * 		StudentAnswerModel
 *			studentCorrect: boolean
 *
 */

var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('backbone/node_modules/underscore');
var QuizModel = require('../models/QuizModel');
var QuestionModel = require('../models/QuestionModel');
var StudentAnswerModel = require('../models/StudentAnswerModel');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			numberOfQuestions: 0,
			answerThenQuestion: null,
			allAnswerList: null,
			currentType: null,
			correctAnswers: null,
			allQuizzes: []
		};
	},
	componentWillMount: function() {
		// pull all quizzes
		var quizQuery = new Parse.Query(QuizModel);
		quizQuery.find().then(
			(quiz) => {
				this.setState({allQuizzes: quiz});
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render: function() {
		var rightContent = null;

		// Display all quizzes in the drop down
		var leftContent = this.state.allQuizzes.map(function(quiz) {
			return (
				<option key={quiz.id} value={quiz.id}>{quiz.get('quizTitle')}</option>
			);
		});

		// future content of the right content
					// <div key={question.id}>
					// 	<h4>Question</h4>
					// 	<div>{question.get('questionId')}</div>
					// 	<h4>Answer</h4>
					// 	<div>{question.get('questionAverage')}</div>
					// </div>
					// <h2>Questions and Answers go here!</h2>


		if(this.state.allQuestions) {
			console.log('answers appeared');
			rightContent = this.state.allQuestions.map(function(question) {
				return (
					<div key={question.id}>
						<h5>Question</h5>
						<div>{question.questionTitle}</div>
						<h5>Answer</h5>
						<div>{question.questionAverage}</div>
					</div>
				);
			});
		}
		else {
			rightContent = (
				<div>Please select a quiz to see data related to that query</div>
			);
		}

		return (
			<div className="class-analytics-container">
				<div className="left-side">
					<h1>Class Analytics</h1>
					<form onSubmit={this.onQuizSelected}>
						<label htmlFor="quizList">Choose Quiz</label>
						<select ref="thisQuiz" id="quizList">
							{leftContent}
						</select>
						<button>Select</button>
					</form>
				</div>

				<div className="right-side">
					<div>{rightContent}</div>
				</div>
			</div>
		);
	},
	onQuizSelected: function(e) {
		e.preventDefault();
		console.log(this.refs.thisQuiz.value);

		this.setState({
			currentType: this.objectId
		});

		var quizId = this.refs.thisQuiz.id;
		console.log(quizId);

		var answerQuery = new Parse.Query(StudentAnswerModel);
		var innerQuestionQuery = new Parse.Query(QuestionModel);

		innerQuestionQuery.equalTo('quizId', new QuizModel({objectId: this.refs.thisQuiz.value}));
		answerQuery.include('questionId').matchesQuery('questionId', innerQuestionQuery).find().then(
			(studentAnswers) => {
				var answerList = _.groupBy(studentAnswers, function(answer) {
					return answer.get('questionId').id;
				});

				var findQuestions = [];

				console.log(answerList);

					// array to map with question and percentage correct

				for (var props in answerList) {

					var totalNumOfAnswers = answerList[props].length;
					var numberCorrect = 0;
					var questionAverage = 0;

					for (var j=0; j < totalNumOfAnswers; j++) {

						if (answerList[props][j].get('studentCorrect') === true) {
							numberCorrect++;
						}
					}

					var questionInfo = {
						question: answerList[props][0].get('questionId'),
						questionTitle: answerList[props][0].get('questionTitle'),
						questionAverage: numberCorrect/totalNumOfAnswers*100
					};

					console.log(answerList[props][0].get('questionId'));

					findQuestions.push(questionInfo);
				}
				this.setState({ allQuestions: findQuestions });

			},
			(err) => {
				console.log(err);
			}
		);
	}
});
