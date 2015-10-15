//The QuizResultsComponent creates the html that dsiplays the users results after having completed a quiz, includong the correct or incorrect answers marked.
//The expected properties are the QuizModel(to identify which quiz to show the results for), the QuestionModel(to identify what each question needs), and the StudentAnswersModel(so the correct answers will be associated with the proper questions)

var React = require('react');
var PossibleAnswersComponent = require('./PossibleAnswersComponent');
var numQuestions = 0;
var numCorrect = 0;


module.exports = React.createClass({
	getInitialState: function () {
		return {
			user: this.props.userId,
			quiz: this.props.quizId,
			questions: [],
			error: null
		}
	},
	componentWillMount: function () {
		var UserModel = Parse.User;
		var QuizModel = Parse.Object.extend('QuizModel');
		var QuestionModel = Parse.Object.extend('QuestionModel');
		var StudentAnswerModel = Parse.Object.extend('StudentAnswerModel');

		var userId = this.props.userId;
		var targetUserModel = new UserModel({objectId: userId});
		var quizId = this.props.quizId;
		var targetQuizModel = new QuizModel({objectId: quizId});
		var query = new Parse.Query(StudentAnswerModel);
		var innerQuery = new Parse.Query(QuestionModel);
		query.equalTo('userId', targetUserModel);
		innerQuery.equalTo('quizId', targetQuizModel);
		query.matchesQuery('questionId', innerQuery);
		query.include('questionId');
		query.ascending('createdAt').find().then((results) => {
			this.setState({
				questions: results
			})
		});
	},
	render: function() {

		var ListQuestionDetails = this.state.questions.map((question) => {
			return (
					<div className="question-container">
						<div className="question">{question.get('questionId').get('questionContent')}</div>
						<PossibleAnswersComponent questionChoices={question.get('questionId').get('questionChoices')} correctChoice={question.get('questionId').get('correctChoice')} studentChoice={question.get('studentChoice')}/>
						<hr />
					</div>
				)
		});

		//var questions maps out the questions associated with the quizId

			return (
				<div>
					<div className="container">
						<h5>Your Results</h5>
						<h5 className="title">Quiz Name: </h5>
					</div>
					<hr />
					<div>
						{ListQuestionDetails}
					</div>
					<div>
						<div className="percentage">Percentage: %</div>
					</div>
					<button className="button" onClick={this.onReturnQuizList}>Return to Quiz List</button>
				</div>
			);
	},
	onReturnQuizList: function(e) {
			this.props.router.navigate('quizList', {trigger: true});
	}
});

