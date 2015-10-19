var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('backbone/node_modules/underscore');
var QuizModel = require('../models/QuizModel');
var QuestionModel = require('../models/QuestionModel');
var StudentAnswerModel = require('../models/StudentAnswerModel');

module.exports = React.createClass({
	getInitialState: function() {
		return {
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
				<option key={quiz.id} value={quiz.id}>{quiz.get('quizTitle').replace(/([>]\s*)?([#*_-]+)/gi,"")}</option>
			);
		});

		return (
			<div>
				<div className="header">
					<label htmlFor="quizList" className="choose-quiz"><h3>Existing Quizzes</h3></label>
				</div>
				<form onSubmit={this.onQuizSelected}>
					<select ref="thisQuiz" id="quizList" className="drop-down-btn">
						{leftContent}
					</select><br />
					<button className="select-btn">Select</button>
				</form>
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
		this.props.router.navigate('#editQuiz/'+this.refs.thisQuiz.value, {trigger: true});
	}
});
