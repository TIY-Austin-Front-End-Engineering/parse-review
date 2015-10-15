//Component will take the current quiz and allow the teacher to add questions. once
//a question is added, then it will populate back onto the edit quiz page.
var React = require('react');
var QuizModel = require('../models/QuizModel');
var QuestionModel = require('../models/QuestionModel');
var PostQuestionComponent = require('./PostQuestionComponent');
var Backbone = require('backbone');

module.exports  = React.createClass({
		getInitialState: function(){
			return{
				// add an if statement to check that both, if rednder truthie render
				quiz: null,
				questions: null
			};
	},
	componentWillMount: function(){
		// fetching and setting the quiz model
		var query = new Parse.Query(QuizModel);
		query.get(this.props.quizId).then(
			(quiz) =>{
				this.setState({quiz:quiz})
			});
		// fetching and setting the questions pointer associated with the quiz model
		var newQuery = new Parse.Query(QuestionModel);
		var targetQuizModel = new QuizModel({objectId: this.props.quizId});
		newQuery.equalTo('quizId',targetQuizModel);
		newQuery.find({
				success:(questions) => {
					this.setState({questions: questions})
				}

			});
			
		
	},
	render: function() {
		if(this.state.questions && this.state.quiz){
			var questionsElement = this.state.questions
			//mapping out the question model to display on edit quiz
			.map(function(question){
				//mapping out the question choice array on edit quiz
				var choiceRows = question.get('questionChoices').map(function(choice){
					return(
						<div>
						{choice}
						</div>
					)
				});
				return(
					<div>
						<div>{question.get('questionTitle')}</div>
						<div>{question.get('questionContent')}</div>
						<div>{choiceRows}</div>
						<div>Correct Answer: {question.get('correctChoice')}</div>
						<hr />
					</div>
				);
			});
		} else{
			console.log('loading');

		}
		
		return (
			<div>
				<button onClick={this.addQuestion}>Add a Question </button>
				<div>{questionsElement}</div>
			</div>

		);
	},
	addQuestion: function(){
		QuizModel.increment("totalQuestions");
		QuizModel.save();
		this.props.router.navigate('editQuiz/'+this.state.quiz.id+'/postQuestion', {trigger: true});
	}
});

