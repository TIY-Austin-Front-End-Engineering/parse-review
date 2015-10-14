var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var QuizModel = require('../models/QuizModel');
var QuestionModel = require('../models/QuestionModel');
var StudentAnswerModel = require('../models/StudentAnswerModel');

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	         currentQuestion:0,
	    };

	},
	componentDidMount: function() {
		this.start = new Date();
		var query = new Parse.Query(QuizModel);
		query.get(this.props.quizId).then(
			(quiz) => {

				var questionQuery = new Parse.Query(QuestionModel);
				questionQuery.equalTo("quizId", quiz);
				questionQuery.find().then(
					(questionVar) => {
			    		this.setState({
							currentQuestion:0,
			  			    questions:questionVar
						})
					}
				)
			}
		)
	},
	submitSolve: function(){
		this.state.currentQuestion++;
		var answer = new StudentAnswerModel();
		answer.set('studentChoice',this.currentQuestion.selectedChoiceId);
		answer.set('questionId',this.currentQuestion);
		answer.set('studentCorrect',this.currentQuestion.selectedChoiceId == this.currentQuestion.get('correctChoice'));
		answer.set('userId',Parse.User.current());
		answer.save();
		if(this.state.currentQuestion >= this.state.questions.length){
			var end = new Date();
			var elapsed = this.start - end;
			this.props.quizIsFinished(elapsed)
			return;
		}
		this.setState({
	         currentQuestion:this.state.currentQuestion;
	    })
	},
	answerPicked: function(e){
		this.currentQuestion.selectedChoiceId = e.currentTarget.value
	},
	render: function() {
		var questions = this.state.questions

		if(questions == null){
			return (<div>Loading Quiz...</div>);
		}

		var questionVar = questions
		var currentQuestion = questionVar[this.state.currentQuestion]
		this.currentQuestion = currentQuestion

		var self = this;
		var choices = currentQuestion.get('questionChoices').map(function(qc){

				return(<div><input value={qc} type='radio' name='radioAnswer' onChange={self.answerPicked} /> &nbsp;{qc}</div>);
		});

			return (
				<div className="Quiz">
					<div>
						{currentQuestion.get('questionContent')}
					</div>
					{choices}
					<button onClick={this.submitSolve}>Submit</button>
				</div>
			)
	}
});
