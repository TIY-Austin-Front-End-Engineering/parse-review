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
var CohortModel = require('../models/CohortModel');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			allAnswerList: null,
			allCohorts: [],
			allQuizzes: [],
			currentType: null,
			correctAnswers: null,
			allQuizzes: [],
			loading: false,
			showQuizSelect: false
		};
	},
	componentWillMount: function() {
		// pull all quizzes
		var cohortQuery = new Parse.Query(CohortModel);
		cohortQuery.find().then(
			(cohorts) => {
				this.setState({allCohorts: cohorts});
		},
			(err) => {
				console.log(err);
			}
		);
	},
	render: function() {
		
		var rightContent = null;
		var button = (<button ref="button" className="select-btn">Select</button>);
		if(this.state.loading) {
			button = (<button ref="button" className="select-btn">Loading...</button>)
		}
		// Display all quizzes in the drop down
		var quizOptions = this.state.allQuizzes.map(function(quiz) {
			return (
				<option key={quiz.id} value={quiz.id}>{quiz.get('quizTitle').replace(/([>]\s*)?([#*_-]+)/gi,'')}</option>
			);
		});
		var cohortOptions = this.state.allCohorts.map(function(cohort) {
			return (
				<option key={cohort.id} value={cohort.id}>{cohort.get('name')}</option>
			)
		});
		if(this.state.showQuizSelect) {
			var showQuizSelect = (
				<form onSubmit={this.onQuizSelected}>
					<h4 className="choose-quiz">Choose Quiz</h4>
					<select ref="thisQuiz" id="quizList" className="drop-down-btn">
						{quizOptions}
					</select>
					{button}
				</form>
			)
		}

		// Display questions and averages for the selected quiz
		if(this.state.allQuestions) {
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
					<div className="border" key={question.id}>
						<h5 className="question-title">Question:</h5>
						<span>
							<div className="question">{question.questionTitle.replace(/([>]\s*)?([#*_-]+)/gi,"")}</div>
						</span>
						<span className="question-answer">
							<h5 id="silly">Answer</h5>
						</span>
						<span>{question.questionAnswer}</span>
						<h5 id="silly1">Percentage:</h5>
						<span className="avg" style={color}>{question.questionAverage}%</span>
					</div>
				);

			});
			if(this.state.allQuestions.length < 1) {
				rightContent = (<div className="error-message">Data not yet available for this quiz</div>);
			}
		}
		else {
			rightContent = (
				<div>Please select a quiz to see data related to that query</div>
			);
		}

		return (
			<div className="class-analytics-container">
				<div className="page-title">
					<h1>Class Analytics</h1>
				</div>
				<div className="row">
					<div className="left-side four columns">
						<form onSubmit={this.onCohortSelected}>
							<h4 className="choose-quiz">Choose Cohort</h4>
							<select ref="thisCohort" id="quizList" className="drop-down-btn">
								{cohortOptions}
							</select>
							{button}
						</form>
						{showQuizSelect}
					</div>
					<div className="eight columns">
						<div>{rightContent}</div>
					</div>
				</div>
			</div>
		);
	},
	onCohortSelected: function(e) {
		e.preventDefault(e);
		this.setState({showQuizSelect: true});
		var quizQuery = new Parse.Query(QuizModel);
		quizQuery.equalTo('cohortId', new CohortModel({ objectId: this.refs.thisCohort.value }));
		console.log(this.refs.thisCohort.value);
		console.log(quizQuery);
		quizQuery.find().then(
			(quiz) => {
				this.setState({ allQuizzes: quiz });
			},
			(err) => {
				console.log(err);
			}
		);
	},
	onQuizSelected: function(e) {
		e.preventDefault();
		this.refs.button.disabled = true;
		this.setState({loading: true});
		this.setState({
			currentType: this.objectId
		});

		//var quizId = this.refs.thisQuiz.id; --declared but not used? JA

		var answerQuery = new Parse.Query(StudentAnswerModel);
		var innerQuestionQuery = new Parse.Query(QuestionModel);

		innerQuestionQuery.equalTo('quizId', new QuizModel({ objectId: this.refs.thisQuiz.value }));
		answerQuery.include('questionId').include('questionContent').matchesQuery('questionId', innerQuestionQuery).find().then(
			(studentAnswers) => {
				var answerList = _.groupBy(studentAnswers, function(answer) {
					return answer.get('questionId').id;
				});

				var findQuestions = [];

				// Loop through the answerList object to pull out needed data
				for (var props in answerList) {

					var totalNumOfAnswers = answerList[props].length;
					var numberCorrect = 0;
					var questionAverage = 0;
					var roundedQuestionAverage = 0;

					for (var j=0; j < totalNumOfAnswers; j++) {

						if (answerList[props][j].get('studentCorrect') === true) {
							numberCorrect++;
						}
					}
					// Round the average for each question to the nearest hundredths place
					roundedQuestionAverage = Math.round(numberCorrect/totalNumOfAnswers*10000);

					var questionInfo = {
						questionAnswer: answerList[props][0].get('questionId').get('correctChoice'),
						question: answerList[props][0].get('questionId'),
						questionTitle: answerList[props][0].get('questionId').get('questionContent'),
						questionAverage: roundedQuestionAverage/100
					};
					console.log(questionInfo.questionAnswer);
					findQuestions.push(questionInfo);
				}
				this.setState({ allQuestions: findQuestions });
				this.refs.button.disabled = false;
				this.setState({ loading: false });
			},
			(err) => {
				console.log(err);
			}
		);
	}
});
