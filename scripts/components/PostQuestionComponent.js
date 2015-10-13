var React = require('react');
var Backbone = require('backbone');
var QuestionModel = require('../models/QuestionModel');
//component for admin teachers to post questions to the server

module.exports = React.createClass({
	//created a blank array for multiple choice answers to be added into
	getInitialState: function(){
		return (
			{choices: []}
		);
	},
	render: function() {
	//once a new multiple choice answer is added in, choiceRows will map and display onto the page
		var choiceRows = this.state.choices.map(function(choice){
			return(
				<label>
				<input type="radio" value={choice}/>
				{newChoice}
				</label>
			)
		});
		return (
	//the html to display on the post question page
			<form>
				<input type="text" ref="questionTitle" className="validate" />
				<input type="text" ref="choice" className="validate" />

				<button onClick={this.onAddChoice}> Add Choice </button>
					{choiceRows}
					{errorElement}
				<input type="text" ref="questionAnswer" className="validate" />
				<button onClick={this.onSubmit}>Submit Question</button>
			</form>

		);
	},
	onSubmit: function(e){
	//selecting the correct answer from the multiple choice array
		e.preventDefault();
		var correctAnswer = null;
		var errorElement = null;
		for(var i = 0; i < currentChoices.length; i++) {
			var correct = currentChoices[i];
			if(correct.checked) {
				correctAnswer = correct.value;
			}
		}
		if(correctAnswer = null){
			errorElement = (
				<p className="red">Please select a correct answer</p>
			);
		}
	//once question is filled out, send to the server
		var newQuestion = new QuestionModel({
			questionContent: this.refs.questionTitle.value,
			questionChoices: choices,
			correctChoice: correctAnswer
		});

		newQuestion.save();

	},
	onAddChoice: function(){
	//push the multiple choice answers to the choice array
		var newChoice = this.refs.choice.value;
		var currentChoices = this.state.choices;
		currentChoices.push(newChoice);
		this.setState({choices: currentChoices})	
	}
});
