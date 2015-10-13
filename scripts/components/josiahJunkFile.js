var React = require('react');
var Backbone = require('backbone');
var AttendanceRowComponent = require('./AttendanceDataRowComponent');
var QuizModel = require('../models/QuizModel');
//pass in quiz id as prop - quiz

module.exports = React.createClass({
	getInitialState: function() {
		return {
			answerList: [],
			students: [],
			quizList: []
		}
	},
	componentWillMount: function() {
		var quizQuery = new Parse.Query(QuizModel);
		quizQuery.descending('createdAt').find().then(
			(quiz) => {
				this.setState({quizList: quizes})
			},
			(err) => {
				console.log(err);
			}
		)
		// var query = new Parse.Query(StudentAnswer);
		// var innerQuery = new Parse.Query(Parse.Object.extend('Question'));
		// innerQuery.equalTo('quizId', this.props.quiz);
		// query.matchesQuery('questionId', innerQuery);
		// query.find().then( (studentAnswers) => {
		// 	var AnswersList = _.groupBy(studentAnswers, function() {
		// 		return studentAnswers.get('userId').id;
		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 	}
		// 	)
		// 	this.setState({answerList: AnswersList});
		// })
		// console.log(AnswersList);
		// var studentsListquery = new Parse.Query(User);
		// studentsListquery.notEqualTo('type','teacher').find().then(
		// 	(students) => {
		// 		this.setState({students: students});
		// 	},
		// 	(err) => {
		// 		console.log(err);
		// 	}
		// )
	},
	render: function() {
		console.log(this.state.quizList);
		//var showComponent = null;
		// var attendanceBodyData = this.quiz.map(function(student) {
		// 	<AttendanceRowComponent student={student} date={this.quiz}/>
		// })
		// var attendance = (
		// 	<table className="u-full-width">
		// 		<h1>Quiz Name</h1>
		// 		<thead>
		// 			<tr>
		// 				<th>Day Administered</th>
		// 				<th>Student Name</th>
		// 				<th>Time Started</th>
		// 			</tr>
		// 		</thead>
		// 		{attendanceBodyData}
		// 	</table>
		// )
		// var accessDenied = (
		// 	<h1>Must have Admin Permission to view attendance.</h1>
		// 	)
		// Parse.User.current().get('teacher') ? showComponent = attendance : showComponent = accessDenied;
		return (
			<div>
				<form>
					<div className="six columns">
						<label for="exampleRecipientInput">Select Quiz</label>
						<select className="u-full-width" id="exampleRecipientInput">
						<option value="Option 1">Questions</option>
						<option value="Option 2">Admiration</option>
						<option value="Option 3">Can I get your number?</option>
						</select>
					</div>
				</form>
				//{showComponent}
			</div>
		)
	}
})