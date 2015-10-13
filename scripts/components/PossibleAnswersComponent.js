//The PossibleAnswersComponent pulls the users answers and the answers associated with each questions and renders them on the page, color-coded by correct status
//The needed properties are the StudentAnswerModel and the QuestionModel for determining the correctly associated questions and answers.

var React = require('react');
var QuestionModel = require('../models/QuestionModel')
var StudentAnswerModel = require('../models/StudentAnswerModel')
var query = new Parse.Query(StudentAnswerModel);
var innerQuery = new Parse.Query(QuestionModel);
var numCorrectAnswers = 0;

module.exports = React.createClass({
	getInitialState: function() {
		return {
			answers: this.props.answers,
			correctAnswer: this.props.correctAnswer,
			studentChoice: null,
			quizId: this.props.quizId,
			question: this.props.question
			
		}
	},
	componentWillMount: function(){
		//Lines 18-27 first grabs the specific quiz, then grabs the answers associated with the specific question, then filters only the answer by the current user.
		innerQuery.equalTo('quizId', this.state.quizId);
		query.matchesQuery('questionId', this.state.question.id)
		.equalTo('userId', Parse.User.current())
		.find().then(function(studentAnswer){
			console.log(studentAnswer);
			this.setState({
				studentChoice: studentAnswer
			})
		})
	},
	render: function() {
		//var answer maps out all the current answers for the associated question
		var answer = this.state.answers
		.map(function(answer) {
			//Lines 33-48 display the answers, color-coded to denote correct or incorrect answers
			if (this.state.studentChoice === this.state.correctAnswer){
				question.save({
					studentCorrect: true
				}),
				numCorrectAnswers+1;
				return (
					<div>
						<h4 className="green">{answer}</h4>
					</div>
				);	
			}
			else {
				question.save({
					studentCorrect: false
				})
				return (
					<div>
						<h4 className="red" >{answer}</h4>
					</div>
				);	
			}
		})
	}
});