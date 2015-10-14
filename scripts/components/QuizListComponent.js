// Pulling data from Quiz Model to get information on the Quiz Title,
// Total Number of Questions, Quiz Start Time and Quiz Expiration Time
// and displaying that information.

var React = require('react');
var QuizModel = require('../models/QuizModel');
var moment = require('moment');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			quizList: []
		}
	},
	componentWillMount: function() {
		this.query = new Parse.Query(QuizModel);
		this.fetch();
	},
	render: function(){
		var _this = this;
		var allQuizzes = this.state.quizList.map(function(quiz){
			var startTime = quiz.get('startTime');
			var expireTime = quiz.get('expireTime');

			return (
				<div key={quiz.id} className="quiz-margin-container">
					<div className="quiz-container">
						<div>
							<div className="quiz-title">
								{_this.capitalizeFirstLetter(quiz.get('quizTitle'))}
								<button className="take-quiz">Take Quiz</button>
							</div>
							<hr />
							<div>Total Questions: {quiz.get('totalQuestions')}</div>
							<div className="quiz-start-expire"><span className="quiz-time-title">Start-Time</span>: {moment(startTime).format("MMMM Do, h:mm a")}</div>
							<div className="quiz-start-expire"><span className="quiz-time-title">Expire-Time</span>: {moment(expireTime).format("MMMM Do, h:mm a")}</div>
						</div>
					</div>
				</div>
			)
		});
		return(
			<div className="quiz-list-component">
				<div className="row">
					<div className="left four columns">
						<div className="copy-container">
							<div className="copy-title">What is this?</div>
							<hr />
							<p className="copy">
							Welcome students to the Quiz! Page,
							here you can see all of the quizzes,
							that your instructors have made for your quizzing pleasure.
							All you have to do is find the quiz you want to take and click the button.
							It is that simple, you have until the Quiz Expire Time to complete that quiz.
							Happy Quizzing!
							</p>
						</div>
					</div>
					<div className="right eight columns">
						<div className="quiz-banner-container">
							<h1>All Quizzes</h1>
						</div>
						{allQuizzes}
					</div>
				</div>
			</div>
		)
	},
	fetch: function(){
		this.query.descending("createdAt");
		this.query.limit(6);
		this.query.find().then(
			(allQuizzes) => {
				this.setState({quizList: allQuizzes})
			},
			(err) => {
				console.log(err)
			}
		)
	},
	capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
	}

})
