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
			<div>
				<form onSubmit={this.onSubmit}>
					<input type="text" ref="quizName" placeholder="Quiz Title"/>
					<input type="date" ref="dateToStart" placeholder="date to starts" />
					<input type="date" ref="dateExpire" placeholder="date to expire" />
					<button>Create Quiz</button>
					{this.state.errorMsg}
				</form>
			</div>
		);

	},
	onSubmit: function(e){
		//grabbing the name and id of new quiz and passing it through to edit quiz
		e.preventDefault();
		if(this.refs.quizName.value === '' || this.refs.dateToStart.value === '' || this.refs.dateExpire.value === ''){
				console.log('Please fill in all fields');
				this.setState({errorMsg: 'Please fill in all fields'});
		}else {
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
	}
});
