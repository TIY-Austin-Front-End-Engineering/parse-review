//The QuizResultsComponent creates the html that dsiplays the users results after having completed a quiz, includong the correct or incorrect answers marked.
//The expected properties are the QuizModel(to identify which quiz to show the results for), the QuestionModel(to identify what each question needs), and the StudentAnswersModel(so the correct answers will be associated with the proper questions)

var React = require('react');
var QuizModel = require('../models/QuizModel');
var QuestionModel = require('../models/QuestionModel');
var StudentAnswersModel = require('../models/StudentsAnswersModel');
var quizQuery = new Parse.Query(QuizModel);
var questionsQuery = new Parse.Query(QuestionModel);
var studentAnswersQuery = new Parse.Query(StudentAnswersModel);
var PossibleAnswersComponent = require('./components/PossibleAnswersComponent');
var numQuestions = 0;
var numCorrect = 0;


module.exports = React.createClass({
	getInitialState: function() {
		return {
			user: this.props.user,
			quiz: null,
			questions: [],
			error: null
		
		}
	},
	componentWillMount: function() {
		//Lines 20-34 grab the quizId from the server
		quizQuery.equalTo('objectId', this.props.quiz)
		.first({
			success: (result) => {
				this.setState({
					quiz: result
				});
			},
			error: (error) => {
				console.log('didnt find it');
				this.setState({
					error: err.message
				})
			}
		});
		//Lines 35-50 grab all the questions associated with the previous grabbed quizId
		questionsQuery.equalTo('quiz_id', this.props.quiz)
		.find({
			success: (result) => {
				console.log(result);
				that.setState({
					questions: result
				});
			},
			error: (error) => {
				console.log('didnt find any questions');
				that.setState({
					error: err.message
				})
			}
		});
			
	},
	render: function() {
		//var questions maps out the questions associated with the quizId
		var questions = this.state.questions
		.map(function(question) {
			this.setState({

			})
			return (
				<div>
					<h2>{question.get('questionTitle')}</h2>
					<h3>{question.get('questionContent')}</h3>
					<PossibleAnswersComponent question={question} answers={question.get('questionChoices')} correctAnswer={question.get('correctChoice')} quizId={this.state.quiz.id}/>
				</div>
				);
		})
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
	},
	percent: function(){
		//correct answers devided by num questions
		studentAnswersQuery.equalTo('quiz_id', this.state.quiz)
		.equalTo('studentCorrect', true).then({
			success: function (results){
				numCorrect=results.length()
			}
		})
		numQuestions=this.state.questions.length();
		return Math.round(numCorrect/numQuestions*100)
	}
	
});