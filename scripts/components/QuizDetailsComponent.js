// Pulling quiz data from QuizModel and questions from QuestionModel.
// Printing questions from database to browser page after every submit button click event.
// Setting answers to created 'answer' model and saving the model to the database
// Collected start time, end time, and difference.
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
	         quiz: null
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
						console.log(questionVar)
			    		this.setState({
							currentQuestion:0,
			  			    questions:questionVar,
			  			    quiz: quiz
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
			this.props.router.navigate('#quizResults/'+Parse.User.current().id+'/'+this.props.quizId, {trigger: true});
			return;
		}
		this.setState({
	         currentQuestion:this.state.currentQuestion
	    })
	    $(this.getDOMNode()).find('[type="radio"]').prop("checked", false);
	},
	},
	answerPicked: function(e){
		this.currentQuestion.selectedChoiceId = e.currentTarget.value;	
	},
	render: function() {
		var questions = this.state.questions;

		if(questions == null){
			return (<div>Loading Quiz...</div>);
		}
		var quizTitle = this.state.quiz.get("quizTitle");
		var questionVar = questions;
		var currentQuestion = questionVar[this.state.currentQuestion];
		this.currentQuestion = currentQuestion;
		console.log(currentQuestion);

		var self = this;
		var choices = currentQuestion.get('questionChoices').map(function(qc){

			return(<div><input value={qc} type='radio' defaultValue={false} name='radioAnswer' onChange={self.answerPicked} /> &nbsp;{qc}</div>);
		}); 

			return (
				<div className=" row quiz-details-container">
					<div className="quiz-details-component">
						<h4>{quizTitle}</h4>
						<hr />
						<div>
							{currentQuestion.get('questionContent')}
						</div>
						<div>
						{choices}
						</div>
						<button className="submit-btn" onClick={this.submitSolve}>Submit</button>
					</div>
				</div>
			)
	}
});