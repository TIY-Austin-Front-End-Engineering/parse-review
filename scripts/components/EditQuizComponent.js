var React = require('react');
var QuizModel = require('../models/QuizModel');
var PostQuestionComponent = require('./PostQuestionComponent');

module.exports  = React.createClass({
		getInitialState: function(){
		return{
			quiz: null
		};
	},
	componentWillMount: function(){
		var query = new Parse.Query(QuizModel);
		query.get(this.props.quizId).then(
			(quiz) =>{
				this.setState({quiz:quiz})
				console.log(quiz);
			});
	},
	render: function() {
		return (
			<div>
				<button onClick={this.addQuestion}>Add a Question </button>
			</div>
		);
	},
	addQuestion: function(){
		this.props.router.navigate('editQuiz/'+this.state.quiz.id+'/postQuestion', {trigger: true});
	}
});

