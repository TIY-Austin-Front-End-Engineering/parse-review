var React = require('react');
var Backbone = require('backbone');
var QuestionModel = require('../models/QuestionModel');


module.exports = React.createClass({
	getInitialState: function(){
		return (
			{choices: []}
		);
	},
    render: function() {
    	var choiceRows = this.state.choices.map(function(choice){
    		return(
    			<label>
    			<input type="radio" value={choice}/>
    			{newChoice}
    			</label>
    		)
    	});
        return (
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
    }
    onSubmit: function(e){
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
    	var newQuestion = new QuestionModel({
    		question: this.refs.questionTitle.value,
    		choices: choices,
    		correctAnswer: correctAnswer
    	});

    	newQuestion.save();

    },
    onAddChoice: function(){
    	var newChoice = this.refs.choice.value;
    	var currentChoices = this.state.choices;
    	currentChoices.push(newChoice);
    	this.setState({choices: currentChoices})
    	
	
    	
    }
});


