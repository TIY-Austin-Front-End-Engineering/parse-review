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
				<option key={quiz.id} value={quiz.id}>{quiz.get('quizTitle')}</option>
			);
		});

		return (
			<div className="class-analytics-container">
				<div className="row">
					<div className="left-side four columns">

						<form onSubmit={this.onQuizSelected}>
							<label htmlFor="quizList" className="choose-quiz">Choose Quiz</label>
							<select ref="thisQuiz" id="quizList" className="drop-down-btn">
								{leftContent}
							</select>
							<button className="select-btn">Select</button>
						</form>

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
		this.props.router.navigate('#editQuiz/'+this.refs.thisQuiz.value, {trigger: true});
	}
});
