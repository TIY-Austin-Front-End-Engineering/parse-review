//component will allow the teacher to create a new quiz with a new quiz id
var React = require('react');
var Backbone = require('backbone');
var PostQuestionComponent = require('./PostQuestionComponent');
var QuizModel = require('../models/QuizModel');
var EditQuizComponent = require('./EditQuizComponent');


module.exports = React.createClass({
	getInitialState: function(){
		return (
			{
				errorMsg: null
			}

		);
	},
	render:function(){
		return(
			<div className="row create-quiz-container">
				<div className="instructions five columns">
					<h3>Instructions</h3>
					<hr />
					<ul>
						<li> - Write a quiz title.</li>
						<li> - Select a start time and date.</li>
						<li> - Select an end time and date.</li>
						<li> - Click Create Quiz button to save!</li>
					</ul>
				</div>
				<div className="create-quiz seven columns">
					<h3>Create Quiz</h3>
					<hr />
					<form onSubmit={this.onSubmit}>
						<label>Title</label>
						<input className="u-full-width" type="text" ref="quizName" placeholder="Quiz Title"/>
						<label>Start Date</label>
						<input className="u-full-width" type="date" ref="dateToStart" placeholder="date to starts" />
						<label>End Date</label>
						<input className="u-full-width" type="date" ref="dateExpire" placeholder="date to expire" />
						<button >Create Quiz</button>
						{this.state.errorMsg}
					</form>
				</div>
			</div>

		);

	},
	onSubmit: function(e){
		//grabbing the name and id of new quiz and passing it through to edit quiz
		if(this.refs.quizName.value === '' || this.refs.dateToStart.value === '' || this.refs.dateExpire.value === ''){
				console.log('Please fill in all fields');
				this.setState({errorMsg: 'Please fill in all fields'});
		}else {
			var newQuiz = new QuizModel({
				quizTitle: this.refs.quizName.value,
				startTime: new Date(this.refs.dateToStart.value),
				expireTime: new Date(this.refs.dateExpire.value),
				totalQuestions: 0
			});
			newQuiz.save({
				success: (u) => {
					this.props.router.navigate('#editQuiz/'+newQuiz.id, {trigger: true});
				}
			
			});
		}	
	}
});
