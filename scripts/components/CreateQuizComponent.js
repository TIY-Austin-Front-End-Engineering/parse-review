var React = require('react');
var Backbone = require('backbone');
var PostQuestionComponent = require('./PostQuestionComponent');
var QuizModel = require('../models/QuizModel');


module.exports = React.createClass({
	getInitialState: function(){
		return{
			quiz: null
		};
	},
	componentWillMount: function(){
		var query = new Parse.Query(QuizModel);
		query.get(this.props.quizID)
	}
	render:function(){
		return(
			<div>
				<form onSubmit={this.onSubmit}>
					<input type="text" ref="quizName" placeholder="Quiz Title"/>
					<input type="date" ref="dateToStart" placeholder="date to starts" />
					<input type="date" ref="dateExpire" placeholder="date to expire" />
					<button > Add Question</button>
				</form>
			</div>
		);

	},
	onSubmit: function(e){
		e.preventDefault();
		var newQuiz = new QuizModel({
			quizTitle: this.refs.quizName.value,
			startTime: new Date(this.refs.dateToStart.value),
			expireTime: new Date(this.refs.dateExpire.value)
		});
		newQuiz.save();
	}
});
