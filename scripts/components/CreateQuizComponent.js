//component will allow the teacher to create a new quiz with a new quiz id
var React = require('react');
var Backbone = require('backbone');
var PostQuestionComponent = require('./PostQuestionComponent');
var QuizModel = require('../models/QuizModel');
var CohortModel = require('../models/CohortModel');
var EditQuizComponent = require('./EditQuizComponent');
var ExistingQuizComponent = require('./ExistingQuizComponent');
var Moment = require('moment');


module.exports = React.createClass({
	//Setting the state values of the feedbackElement as well as getting all the cohorts from the cohort model
	getInitialState: function(){
		return(
			{
				feedbackElement:null,
				allCohorts: []
			}
		);
	},
	componentWillMount:function() {
	//Queries all cohorts from Parse and sets their values in state
		var cohortQuery = new Parse.Query(CohortModel);
		cohortQuery.find().then(
			(cohort)=>{
				this.setState({allCohorts: cohort});
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render:function(){
		var today = Moment().format('YYYY-MM-DD');
		//cohorts are mapped into drop down menu by their id and name
		var cohorts = this.state.allCohorts.map(function(
			cohort){
			return(
				<option key={cohort.id} value = {cohort.id}>{cohort.get('name')}</option>
				);
		});
		return(
			<div className="row create-quiz-container">
				<div className="instructions five columns">
					<ExistingQuizComponent router={this.props.router}/>
				</div>
				<div className="create-quiz seven columns">
					<h3>Create Quiz</h3>
					<hr />
					<form onSubmit={this.onSubmit}>
						<label htmlFor="create-quiz-title">Title</label>
						<input className="u-full-width" type="text" ref="quizName" id="create-quiz-title"placeholder="Quiz Title"/>
						<label htmlFor="cohort">Cohort Name</label>
						<select ref="cohortName" id="cohortList" className="drop-down-btn">
								{cohorts}
						</select>
						<label htmlFor="start-date">Start Date and Time</label>
						<input className="u-full-width" type="date" ref="dateToStart" id="start-date" placeholder="date to starts" defaultValue={today} />
						<input type="time" ref="timeToStart" />
						<label htmlFor="start-time">End Date and Time</label>
						<input className="u-full-width" type="date" ref="dateToExpire" id="start-time" placeholder="date to expire" />
						<input type="time" ref="timeToExpire" /><br />
						<button >Create Quiz</button>
						<h2>{this.state.feedbackElement}</h2>
					</form>
				</div>
			</div>

		);

	},
	onSubmit: function(e){
		//grabbing the name and id of new quiz and passing it through to edit quiz. Assigning the quiz a cohortId. 

		e.preventDefault();
		var newQuiz = new QuizModel({
			quizTitle: this.refs.quizName.value,
			cohortId: this.refs.cohortName.value,
			startTime: new Date(this.refs.dateToStart.value),
			expireTime: new Date(this.refs.dateToExpire.value),
			startTime: new Date(this.refs.dateToStart.value+'T'+this.refs.timeToStart.value+':00'),
			totalQuestion: 0
		});
		//checking to see if a cohort was assigned  	
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
		else if(!this.refs.timeToStart.value){
			this.setState({feedbackElement: 'Please add a Starting Time'});
		}
		else if(!this.refs.timeToExpire.value){
			this.setState({feedbackElement: 'Please add an Expiration Time'});
		}
//////////////////////////////////////////////////////////////////////////
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
