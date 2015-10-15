//The StudentAnalyticsComponent:
//Will display student average scores.
//Display the quizes and related students.
//Show quiz start and end time.
//The needed properties are the StudentAnswerModel and the QuestionModel for determining the correctly associated questions and answers.

var React = require('react');
var ReactDOM = require('react-dom');
var QuizResultsComponent = require('./QuizResultsComponent');
var QuizModel = require('../models/QuizModel');
var QuestionModel = require('../models/QuestionModel');
var StudentAnswerModel = require('../models/StudentAnswerModel');

module.exports = React.createClass({
	getInitialState: function () {
		return {
			studentCorrect: null,
			allQuizzes: [],
			students: [],
			answers: []
		};
	},
	componentWillMount: function() {
		console.log('test');
		var query = new Parse.Query(StudentAnswerModel);
		query.include('questionId');
		query.include('questionId.quizId');
		query.include('userId')
		query.find().then(
			(students) => {
				// console.log("called");
				// console.log(students[0].get('userId').id);
				this.setState({students: students});
			},
			(err) => {
				console.log(err);
			}
		);
	},
	render: function() {
		var studentOptions = this.state.students.map((student, index) => {
			console.log(student.get('userId').id);
			return (
				<option value={student.get('userId').id} key={student.get('userId').id+index}>{student.get('userId').get('firstName')+ ' '+student.get('userId').get('lastName')}</option>
			)
		})
		return (
			<div className="six colums">
				<h1>Student Analytics</h1>
				<form onSubmit={this.onStudentSelect}>
					<label htmlFor="students">Select Student</label>
					<select className ="u-full-width" id ="???" ref ="studentPick">
						{studentOptions}
					</select>
					<button>Submit</button>
				</form>
			</div>
		);
	},
	onStudentSelect: function(e) {
		e.preventDefault();
	}



});


















