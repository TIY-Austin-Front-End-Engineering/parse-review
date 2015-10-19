//Component will take the current quiz and allow the teacher to add questions. once
//a question is added, then it will populate back onto the edit quiz page.
var React = require('react');
var QuizModel = require('../models/QuizModel');
var QuestionModel = require('../models/QuestionModel');
var PostQuestionComponent = require('./PostQuestionComponent');
var Backbone = require('backbone');
var marked = require('marked');
marked.setOptions({
	renderer: new marked.Renderer(),
	gfm: true,
	tables: true,
	breaks: false,
	pedantic: false,
	smartLists: true,
	smartypants: false
});

module.exports  = React.createClass({
	getInitialState: function(){
			return{
				quiz: null,
				questions: null,
			};
	},
	componentWillMount: function() {
		// fetching and setting the quiz model
		var query = new Parse.Query(QuizModel);
		query.get(this.props.quizId).then(
			(quiz) =>{
				console.log(quiz);
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
		var _this = this;
		if(this.state.questions && this.state.quiz){
			var questionsElement = this.state.questions
			//mapping out the question model to display on edit quiz
			.map(function(question){
				//mapping out the question choice array on edit quiz
				var choiceRows = question.get('questionChoices').map(function(choice){
					return(
						<div dangerouslySetInnerHTML={_this.markUp(choice)} />
					)
				});
				return(
					<div className="six columns">
						<h5>Question:</h5>
						{/* <div dangerouslySetInnerHTML={_this.markUp(question.get('questionTitle'))} /> */}
						<div dangerouslySetInnerHTML={_this.markUp(question.get('questionContent'))} />
						<div className="answerChoices">Answer Choices: </div>
						<div>{choiceRows}</div>
						<div className="answerChoices">Correct Answer:</div>
						<div><span dangerouslySetInnerHTML={_this.markUp(question.get('correctChoice'))} /></div>
					</div>
				);
			});
			var quizTitle = this.state.quiz.get('quizTitle');
		} else {
			console.log('loading');
		}

		return (
			<div className="edit-quiz-box container">
				<div className="row">
					<div className="eight columns">
						<h3 className="title">{quizTitle}:</h3>
					</div>
					<div className="four columns">
						<button onClick={this.addQuestion}>Add a Question </button>
					</div>
				</div>
				<div className="row questions">{questionsElement}</div>
			</div>
		);
	},
	addQuestion: function(){
		this.props.router.navigate('editQuiz/'+this.state.quiz.id+'/postQuestion', {trigger: true});
	},
	markUp: function(string){
		var markedText = marked(string);
		return { __html: markedText };
	}
});

