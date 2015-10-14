var React = require('react');
var Backbone = require('backbone');
var AttendanceRowComponent = require('./AttendanceDataRowComponent');
var QuizModel = require('../models/QuizModel');
var StudentAnswerModel = require('../models/StudentAnswerModel');
var QuestionModel = require('../models/QuestionModel');
var _ = require('backbone/node_modules/underscore');
//pass in quiz id as prop - quiz

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
			} else {
				student.present = 'absent';
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
		var showComponent = null;
		
		var attendance = (
			<div className="row">
			<div className="three columns"></div>
				<table className="ten columns">
					<thead>
						<tr>
							<th>Day Administered</th>
							<th>Student Name</th>
							<th>Time Started</th>
						</tr>
					</thead>
					{attendanceBodyData}
				</table>
			</div>
		)
		var accessDenied = (
			<h1>Must have Admin Permission to view attendance.</h1>
			)
		//Parse.User.current().get('teacher') ? showComponent = attendance : showComponent = accessDenied;
		return (
			<div>
				<form onSubmit={this.selectQuiz}>
					<div className="six columns">
						<h1>Class Attendance</h1>
						<label htmlFor="exampleRecipientInput">Select Quiz/Day</label>
						<select className="u-full-width" id="exampleRecipientInput" ref="quizPick">
							{quizOptions}
						</select>
					</div>
					<button>Select</button>
				</form>
					{showComponent}
					{attendance}
			</div>
		)
	},
	selectQuiz: function(e) {
		e.preventDefault();
		var studentQuery = new Parse.Query(Parse.User);
		studentQuery.equalTo('teacher', false).find().then(
			(students) => {
				this.setState({students: students});
			},
			(err) => {
				console.log(err);
			}
		);
		var answerQuery = new Parse.Query(StudentAnswerModel);
		var innerQuestionQuery = new Parse.Query(Parse.Object.extend('QuestionModel'));
		innerQuestionQuery.equalTo('quizId', new QuizModel({objectId: this.refs.quizPick.value}));
		answerQuery.matchesQuery('questionId', innerQuestionQuery);
		answerQuery.find().then( 
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
		this.setState({show: true});
	}
})