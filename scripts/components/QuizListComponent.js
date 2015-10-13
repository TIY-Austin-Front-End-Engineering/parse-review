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
		var allQuizzes = this.state.quizList.map(function(quiz){
			var startTime = quiz.get('startTime');
			var expireTime = quiz.get('expireTime');
			return (
				<div key={quiz.id} className="quiz-container">
					<div>
						<div>{quiz.get('quizTitle')}</div>
						<hr />
						<div>Total Questions: {quiz.get('totalQuestions')}</div>
						<div className="quiz-start-expire"><span className="quiz-time-title">Start-Time</span>: {moment(startTime).format("MMMM Do, h:mm a")}</div>
						<div className="quiz-start-expire"><span className="quiz-time-title">Expire-Time</span>: {moment(expireTime).format("MMMM Do, h:mm a")}</div>
					</div>
				</div>
			)
		});
		return(
			<div className="QuizListComponent">
				<div className="quiz-image-container">
					<img src="/images/quiz.jpg" />
				</div>
				{allQuizzes}
			</div>
		  )
	},
	fetch: function(){
		this.query.descending("createdAt");
		this.query.limit(5);
		this.query.find().then(
			(allQuizzes) => {
				this.setState({quizList: allQuizzes})
			},
			(err) => {
				console.log(err)
			}
		)
	}

})
