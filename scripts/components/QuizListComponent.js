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
				<div className="quiz-container">
					<div key={quiz.id}>
						<div>{quiz.get('quizTitle')}</div>
						<div>{quiz.get('totalQuestions')}</div>
						<div>{moment(startTime).format("dddd, MMMM Do, h:mm a")}</div>
						<div>{moment(expireTime).format("dddd, MMMM Do, h:mm a")}</div>
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
