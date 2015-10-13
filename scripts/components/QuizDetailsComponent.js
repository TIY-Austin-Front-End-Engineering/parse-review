var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
var QuizModel = require('Models/QuizModel');
var startTime = new Date();
// comment

module.exports = React.createClass({
	getInitialState: function() {
	    return {
	         allQuestions: [],
	         currentType: null
	    };
	   
	},


	componentWillMount: function() {
		var queryQuizModel = new Parse.Query(QuizModel);

		queryQuizModel.find().then( 
			(question) => { 
				this.setState({allQuestions: question});
			})
	},

	render: function() {
		if(this.state.allQuestions.length == 0){
			return (<div></div>);
		}


	var Question = this.state.Question
	var StudentAnswer = this.state.StudentAnswer

	return (
		<div className="Quiz">
					<h1></h1>
					{Question}
					{StudentAnswer}
				</div>
			</div>
		</div>	
	)}
});
