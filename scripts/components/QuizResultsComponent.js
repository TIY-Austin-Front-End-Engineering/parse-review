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
		query.find().then((results) => {
			this.setState({
				questions: results
			})
			// for(var i = 0; i < results.length; i++) {
			// 	console.log(results[i].get('questionId').get('questionChoices'));
			// 	console.log(results[i].get('studentChoice'));
			// 	console.log(results[i].get('questionId').get('questionContent'));
			// 	// this.setState({
			// 		// questions: results[i].get('questionId').get('questionContent')
			// 	// })
			// }
		});
	},
	render: function() {
		// var questionsChoices = this.state.questions.map((thing) => {
		// 	return thing.get('questionId').get('questionChoices');
		// });

		// var questionChoice = questionsChoices.forEach((choice) => {
		// 	console.log(choice.toString())
		// })

		// console.log(questionChoice.toString())

		var ListQuestionDetails = this.state.questions.map((question) => {
			return (
					<div>
						<div>{question.get('questionId').get('questionContent')}</div>
						<PossibleAnswersComponent questionChoices={question.get('questionId').get('questionChoices')} correctChoice={question.get('questionId').get('correctChoice')} studentChoice={question.get('studentChoice')}/>
						<hr />
					</div>
				)
		});

		//var questions maps out the questions associated with the quizId
		// if (!this.state.quiz||!this.state.questions){
		// 	return <div>Nope</div>
		// }else{

			return (
				<div>
					<div>
						<div>Quiz Name: </div>
						<div>User: </div>
						<div>Percentage: %</div>
					</div>
					<hr />
					<div>
						{ListQuestionDetails}
					</div>
				</div>
			);
		// }
	},
	percent: ()=>{
		//correct answers devided by num questions
		
	}
	
});

