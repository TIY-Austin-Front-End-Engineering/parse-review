//component will allow the teacher to create a new quiz with a new quiz id
var React = require('react');
var Backbone = require('backbone');
var PostQuestionComponent = require('./PostQuestionComponent');
var QuizModel = require('../models/QuizModel');
var EditQuizComponent = require('./EditQuizComponent');


module.exports = React.createClass({
	render:function(){
		return(
			<form onSubmit={this.onSubmit} className="create-quiz-container">
				<div className="row six columns">
					<input className="u-full-width" type="text" ref="quizName" placeholder="Quiz Title"/>
					<input className="u-full-width" type="date" ref="dateToStart" placeholder="date to starts" />
					<input className="u-full-width" type="date" ref="dateExpire" placeholder="date to expire" />
					<button > Create Quiz</button>
				</div>
			</form>
		);

	},
	onSubmit: function(e){
		//grabbing the name and id of new quiz and passing it through to edit quiz
		e.preventDefault();
		var newQuiz = new QuizModel({
			quizTitle: this.refs.quizName.value,
			startTime: new Date(this.refs.dateToStart.value),
			expireTime: new Date(this.refs.dateExpire.value)
		});
		newQuiz.save({
			success: (u) => {
				this.props.router.navigate('#editQuiz/'+newQuiz.id, {trigger: true});
			}

		});	
	}
});
