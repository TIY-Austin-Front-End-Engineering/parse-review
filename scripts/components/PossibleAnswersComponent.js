var React = require('react');
var QuestionModel = require('../models/QuestionModel')
var query = new Parse.Query(StudentAnswerModel);
var innerQuery = new Parse.Query(QuestionModel);


module.exports = React.createClass({
	getInitialState: function() {
	    return {
	    	answers: this.props.answers,
	    	correctAnswer: this.props.correctAnswer,
	    	studentChoice: null,
	    	quiz: this.props.quiz,
	    	question: null
	    }
	},
	componentWillMount: function(){
		innerQuery.equalTo('quizId', this.props.quizId);
		query.matchesQuery('questionId', this.props.question)
		.equalTo('userId', Parse.User.current())
		.find().then(function(studentAnswer){
			console.log(studentAnswer);
			this.setState({
				studentChoice: studentAnswer
			})
		})
	},
	render: function() {
		var answer = this.state.answers
		.map(function(answer) {
			if (this.state.studentChoice === this.state.correctAnswer){
				// this.state.studentChoice.set('studentCorrect'= true)
				return (
					<div>
						<h4 className="green">{answer}</h4>
					</div>
				);	
			}
			else {
				// this.state.studentChoice.set('studentCorrect'= false)
				return (
					<div>
						<h4 className="red" >{answer}</h4>
					</div>
				);	
			}
		})
	}
});