//This is an attendance component that checks student attendance based on weather a student has answered a question or not
//component is pulling list of students, checking whether the student has answered questions for a specific test/day, if they have
//they are marked as present as well as timestamped when the first answer is created to denote to teacher what time the test was started
//this components access is restricted in the router based on whether current user teacher status is true or false
//This compnent does use a child component of StudentDataRowComponent to render each student, their status of present or absent and time started

var React = require('react');
var Backbone = require('backbone');
var AttendanceRowComponent = require('./AttendanceDataRowComponent');
var QuizModel = require('../models/QuizModel');
var StudentAnswerModel = require('../models/StudentAnswerModel');
var QuestionModel = require('../models/QuestionModel');
var _ = require('backbone/node_modules/underscore');


module.exports = React.createClass({
	getInitialState: function() {
		return {
			groupedStudentAnswers: null,
			students: [],
			quizList: []
		}
	},
	componentWillMount: function() {
		var quizQuery = new Parse.Query(QuizModel);
		quizQuery.ascending('startTime').find().then(
			(quizes) => {
				this.setState({quizList: quizes})
			},
			(err) => {
				console.log(err);
			}
		)
	},

	render: function() {
		console.log(this.state.students);
		var quizOptions = this.state.quizList.map(function(quiz) {
			return (
				<option value={quiz.id} key={quiz.id}>{quiz.get('quizTitle')} - {(quiz.get('startTime')) ? quiz.get('startTime').toDateString(): 'Date Unspecified'}</option>
			)
		})
		if(this.state.students.length > 0 && this.state.groupedStudentAnswers) {
			this.state.students.forEach((student) => {
				if(this.state.groupedStudentAnswers.hasOwnProperty(student.id)) {
					student.present = 'present';
					var firstAnswer = _.min(this.state.groupedStudentAnswers[student.id], function(answer) {
						return answer.get('createdAt');
					})
					student.timeStarted = firstAnswer.get('createdAt');
			} else {
				student.present = 'absent';
				student.timeStarted = '-';
			}
			})
			console.log(this.state.groupedStudentAnswers);
			var attendanceBodyData = null;

			attendanceBodyData = this.state.students.map(function(student) {
				return (
				<AttendanceRowComponent key={student.id} student={student} />
				)
			})


		}

		var attendance = (
			<table className="u-full-width">
				<thead>
					<tr>
						<th>Student Name</th>
						<th>Day Administered</th>
						<th>Time Started</th>
					</tr>
				</thead>
				{attendanceBodyData}
			</table>
		)
		return (
			<div>
				<form onSubmit={this.selectQuiz}>
					<div className="att-div">
						<h1 id="att-title">Class Attendance</h1>
						<label htmlFor="exampleRecipientInput" className="att-info">Select Quiz/Day</label>
						<select className="u-full-width" id="exampleRecipientInput" ref="quizPick">
							{quizOptions}
						</select>
					</div>
					<button>Select</button>
				</form>
				{attendance}
			</div>
		)
	},
	selectQuiz: function(e) {
		e.preventDefault();
		var studentQuery = new Parse.Query(Parse.User);
		studentQuery.equalTo('teacher', false).find().then(
			(students) => {
				var sortedStudents = _.sortBy(students, function(student) {
					return student.get('lastName').toUpperCase();
				});
				this.setState({students: sortedStudents});
			},
			(err) => {
				console.log(err);
			}
		);
		var answerQuery = new Parse.Query(StudentAnswerModel);
		var innerQuestionQuery = new Parse.Query(QuestionModel);
		innerQuestionQuery.equalTo('quizId', new QuizModel({objectId: this.refs.quizPick.value}));
		answerQuery.matchesQuery('questionId', innerQuestionQuery).find().then(
			(studentAnswers) => {
				var AnswersList = _.groupBy(studentAnswers, function(answer) {
					return answer.get('userId').id;
				})
				this.setState({groupedStudentAnswers: AnswersList})
			},
			(err) => {
				console.log(err);
			}
		)
	}
})
