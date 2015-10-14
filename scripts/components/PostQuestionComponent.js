var React = require('react');
var Backbone = require('backbone');
var QuestionModel = require('../models/QuestionModel');
var QuizModel = require('../models/QuizModel');
//component for admin teachers to post questions to the server

module.exports = React.createClass({
	//created a blank array for multiple choice answers to be added into
	getInitialState: function(){
		return (
			{
				quiz: null,
				choices: [],
				feedbackElement: null
			}

		);
	},
	componentWillMount: function() {
	    var query = new Parse.Query(QuizModel);
	    query
	    .get(this.props.quizId)
	    .then(
	    	(quiz) => {
	    		this.setState({ quiz: quiz })
	    		console.log(quiz);
	    	},
	    	(err) => {
	    		console.log(err);
	    	}
	    );
	},
	render: function() {
		console.log('render '+ this.state.errorElement)
	//once a new multiple choice answer is added in, choiceRows will map and display onto the page
		var choiceRows = this.state.choices.map(function(choice){
			return(
				<label>
				<input className="radioo" type="radio" value={choice} name="choices"/>
				{choice}
				</label>
			)
		});
		return (
	//the html to display on the post question page
			<div className="post-question">
				<input type="text" ref="questionTitle" className="validate" placeholder="Question" />
				<input type="text" ref="choice" className="validate choice" placeholder="Answer"/>

				<button className="choice-btn" onClick={this.onAddChoice}> Add Choice </button>
					<div ref="choiceRows">				
					{choiceRows}
					</div>
					{this.state.feedbackElement}
				<button onClick={this.onSubmit}>Submit Question</button>
			</div>

		);
	},
	onSubmit: function() {			
	//selecting the correct answer from the multiple choice array
		var radioBtns = this.refs.choiceRows.querySelectorAll('.radioo');
		var correctAnswer = null;
		for(var i = 0; i < radioBtns.length; i++) {
			var correct = radioBtns[i];
			if(correct.checked) {
				correctAnswer = correct.value;
			}
		}
		//once question is filled out, send to the server
		if(correctAnswer === null){
			this.setState({feedbackElement: 'this is an error'});
		}else{
			var newQuestion = new QuestionModel({
				questionContent: this.refs.questionTitle.value,
				questionChoices: this.state.choices,
				correctChoice: correctAnswer
				
			});
			newQuestion.save();
			this.refs.questionTitle.value = '',
			this.refs.choice.value = '',
			this.setState({choices: []});
			this.setState({feedbackElement: 'new question submitted'});
		}
		
		

	},
	onAddChoice: function(){
	//push the multiple choice answers to the choice array
		var newChoice = this.refs.choice.value;
		var currentChoices = this.state.choices;
		currentChoices.push(newChoice);
		this.setState({choices: currentChoices})	
	}
});