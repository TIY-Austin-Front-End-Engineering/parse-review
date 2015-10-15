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
		<div className="row post-question-component">
			<div className="instructions five columns">
				<h3>Instructions</h3>
				<hr />
				<ul>
					<li> - Write a quiz question in the question box.</li>
					<li> - Write in a possible answer in the answer box.</li>
					<li> - Click the Add button to save the possible answer.</li>
					<li> - You may add in multiple answers following the same instructions.</li>
					<li> - Once all possible answers are set, select the correct answer from the list.</li>
					<li> - Click Submit to save your question!</li>
				</ul>
			</div>
			<div className="post-question seven columns">
				<h3 id="h3">Add a Question</h3>
				<hr />
				<label>Write your question here.</label>
				<input type="text" ref="questionTitle" className="validate" placeholder="Question" />
				<label>Write your answer choices here.</label>
				<input type="text" ref="choice" className="validate choice" placeholder="Answer"/>
				<button className="choice-btn" onClick={this.onAddChoice}>Add</button>
					<div ref="choiceRows">				
					{choiceRows}
					</div>
					{this.state.feedbackElement}
				<button onClick={this.onSubmit}>Submit Question</button>
			</div>
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
		if(correctAnswer === null || this.refs.questionTitle.value === '' || this.refs.choice.value === ''){
			this.setState({feedbackElement: 'Please fill in all fields and select a correct answer'});
		}else{
			var quizId =this.props.quizId;
			var targetQuizModel = new QuizModel({objectId: quizId});
			var newQuestion = new QuestionModel({
				quizId: targetQuizModel,
				questionContent: this.refs.questionTitle.value,
				questionChoices: this.state.choices,
				correctChoice: correctAnswer
				
			});
			newQuestion.save();
			this.refs.questionTitle.value = '',
			this.refs.choice.value = '',
			this.setState({choices: []});
			this.setState({feedbackElement: 'New question submitted'});
			this.props.router.navigate('editQuiz/'+this.state.quiz.id, {trigger: true});
		}
		
		

	},
	onAddChoice: function(){
	//push the multiple choice answers to the choice array
		if(this.refs.choice.value === ''){
			this.setState({feedbackElement: 'Please fill in an answer'});
		}else{
			var newChoice = this.refs.choice.value;
			var currentChoices = this.state.choices;
			currentChoices.push(newChoice);
			this.setState({choices: currentChoices})
		}	
	}
});