var React = require('react');
var QuizModel = require('../models/QuizModel');
var QuestionModel = require('../models/QuestionModel');
var StudentAnswersModel = require('../models/StudentsAnswersModel');
var quizQuery = new Parse.Query(QuizModel);
var questionsQuery = new Parse.Query(QuestionModel);
var studentAnswersQuery = new Parse.Query(StudentAnswersModel);
var PossibleAnswersComponent = require('./components/PossibleAnswersComponent');

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	    	user: this.props.user,
	    	quizzes: null,
	    	questions: [],
	        error: null
	    }
	},
	componentWillMount: function() {

		quizQuery.equalTo('objectId', this.props.quiz)
		.first({
			success: (result) => {
        		this.setState({
					quizzes: result
				});
   			},
    		error: (error) => {
       	 		console.log('didnt find it');
       	 		this.setState({
					error: err.message
				})
    		}
		});
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
		var questions = this.state.questions
		.map(function(question) {
		return (
			<div>
				<h2>{question.get('questionTitle')}</h2>
				<PossibleAnswersComponent question={question.id} answers={question.get('questionChoices')} correctAnswer={question.get('correctChoice')} quizId={this.state.quiz}/>
			</div>
			);
		})
		return (
			<div>
				<div>
					<div>Quiz Name: </div>
					<div>User: </div>
					<div>Percentage: </div>
				</div>
				<div>
					{questions}
				</div>
			</div>
		);
	}
	
});