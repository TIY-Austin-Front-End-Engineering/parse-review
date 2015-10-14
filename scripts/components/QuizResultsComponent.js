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
			quiz: null,
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
		query.find().then(function(results) {
			for(var i = 0; i < results.length; i++) {
				console.log(results[i].get('questionId').get('questionChoices'));
				console.log(results[i].get('studentChoice'));
				console.log(results[i].get('questionId').get('questionContent'));
			}
		});
	},
	render: function() {
		//var questions maps out the questions associated with the quizId
		if (!this.state.quiz||!this.state.questions){
			return <div>Nope</div>
		}else{

			return (
				<div>
					<div>
						<div>Quiz Name: {this.state.quiz.get('quizTitle')}</div>
						<div>User: {Parse.User.current('username')}</div>
						<div>Percentage: {this.percent}%</div>
					</div>
					<div>
						{questions}
					</div>
				</div>
			);
		}
	},
	percent: ()=>{
		//correct answers devided by num questions
		
	}
	
});