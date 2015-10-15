/*
 *	Class Analytics Component
 *
 *	requires:
 *		React
 *		ReactDOM
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
			numberOfQuestions: null,
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
		if(this.state.allQuestions) {
			console.log('answers appeared');
			rightContent = this.state.allQuestions.map(function(question) {
				var color = null;
				if(question.questionAverage >= 80) {
					color = {
						color: '#75D055'
					}
				}
				else if(question.questionAverage <= 69) {
					color = {
						color:'#FF6969'
					}
				}
				else {
					color = {
						color: '#FF8F59'
					}
				}
				return (
					<div key={question.id}>
						<h5 className="question-title">Question</h5>
						<div>{question.questionTitle}</div>
						<h5>Answer</h5>
						<div className="avg" style={color}>{question.questionAverage}%</div>
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
				<div className="row">
					<div className="page-title">
						<h1>Class Analytics</h1>
					</div>
					<div className="left-side four columns">

						<form onSubmit={this.onQuizSelected}>
							<label htmlFor="quizList" className="choose-quiz">Choose Quiz</label>
							<select ref="thisQuiz" id="quizList" className="drop-down-btn">
								{leftContent}
							</select>
							<button className="select-btn">Select</button>
						</form>

					</div>

					<div className="right-side eight columns">
						<div className="analytics-container">
							<div>{rightContent}</div>
						</div>
					</div>
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

		innerQuestionQuery.equalTo('quizId', new QuizModel({ objectId: this.refs.thisQuiz.value }));
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
