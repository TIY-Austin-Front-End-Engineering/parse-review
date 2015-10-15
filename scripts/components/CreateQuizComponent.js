//component will allow the teacher to create a new quiz with a new quiz id
var React = require('react');
var Backbone = require('backbone');
var PostQuestionComponent = require('./PostQuestionComponent');
var QuizModel = require('../models/QuizModel');
var EditQuizComponent = require('./EditQuizComponent');
var Moment = require('moment');


module.exports = React.createClass({
	getInitialState: function(){
		return(
			{
				feedbackElement:null
			}
		);
	},
	render:function(){
		var today = Moment().format('YYYY-MM-DD')
		return(
			<div>
				<form onSubmit={this.onSubmit}>
					<input type="text" ref="quizName" placeholder="Quiz Title" />
					<input type="date" ref="dateToStart" />
					<input type="time" ref="timeToStart" />
					<input type="date" ref="dateToExpire" />
					<input type="time" ref="timeToExpire" />
					<button > Create Quiz</button>
					<h2>{this.state.feedbackElement}</h2>
				</form>
			</div>
		);

	},
	onSubmit: function(e){
		//grabbing the name and id of new quiz and passing it through to edit quiz
		e.preventDefault();
		var newQuiz = new QuizModel({
			quizTitle: this.refs.quizName.value,
			startTime: new Date(this.refs.dateToStart.value),
			expireTime: new Date(this.refs.dateToExpire.value)
		});
		console.log(this.refs.dateToStart.value);
		if(!this.refs.dateToStart.value && !this.refs.dateToExpire.value)
		{
			this.setState({feedbackElement: 'Please add a Starting Date and an Expiration Date'});
		}
		else if(!this.refs.dateToStart.value)
		{
			this.setState({feedbackElement: 'Please add a Starting Date'});
		}
		else if(!this.refs.dateToExpire.value){
			this.setState({feedbackElement: 'Please add an Expiration Date'});
		}
//////////////////////////////////////////////////////////////////////////
//THIS WILL BE OBSOLETE ONCE WE GET THE TIME AND DATE CONCATENATED ////////
///////////////////////////////////////////////////////////////////////////
		else if(!this.refs.timeToStart.value){
			this.setState({feedbackElement: 'Please add a Starting Time'});
			console.log('4');
		}
		else if(!this.refs.timeToExpire.value){
			this.setState({feedbackElement: 'Please add an Expiration Time'});
			console.log('5');
		}
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
		else
		{
			newQuiz.save({
				success: (u) => {
					this.props.router.navigate('#editQuiz/'+newQuiz.id, {trigger: true});
				}
			});	
		}
	}
});
