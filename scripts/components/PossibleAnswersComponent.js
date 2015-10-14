//The PossibleAnswersComponent pulls the users answers and the answers associated with each questions and renders them on the page, color-coded by correct status
//The needed properties are the StudentAnswerModel and the QuestionModel for determining the correctly associated questions and answers.

var React = require('react');
var QuestionModel = require('../models/QuestionModel')
var StudentAnswerModel = require('../models/StudentAnswerModel')
var numCorrectAnswers = 0;

module.exports = React.createClass({
	getInitialState: function() {
		return {
			quizId: null,
			question: null,
			choices: null,
			correctChoice: null,
			studentChoice: null
		}
	},
	componentWillMount: function(){
		
	},
	render: function() {

		console.log(this.props.studentChoice)
		console.log(this.props.correctChoice)
		var questionChoicesMap = this.props.questionChoices.map((choice) => {
			
			if(this.props.studentChoice === choice && this.props.studentChoice === this.props.correctChoice) {
				return (
					<div className="green">{choice}</div>
				)
			}
			else if(this.props.studentChoice === choice && this.props.studentChoice !== this.props.correctChoice) {
				return (
					<div className="red">{choice}</div>
				)
			}
			else {
				return (
					<div>{choice}</div>
				)
			}
		})

		return (
			<div>{questionChoicesMap}</div>
		)

		//var answer maps out all the current answers for the associated question
		// var answer = this.state.answers
		// .map(function(answer) {
		// 	//Lines 33-48 display the answers, color-coded to denote correct or incorrect answers
		// 	if (this.state.studentChoice === this.state.correctAnswer){
		// 		question.save({
		// 			studentCorrect: true
		// 		}),
		// 		numCorrectAnswers+1;
		// 		return (
		// 			<div>
		// 				<h4 className="green">{answer}</h4>
		// 			</div>
		// 		);	
		// 	}
		// 	else {
		// 		question.save({
		// 			studentCorrect: false
		// 		})
		// 		return (
		// 			<div>
		// 				<h4 className="red" >{answer}</h4>
		// 			</div>
		// 		);	
		// 	}
		// })
	}
});