// Pulling data from Quiz Model to get information on the Quiz Title,
// Total Number of Questions, Quiz Start Time and Quiz Expiration Time
// and displaying that information.

var React = require('react');
var QuizModel = require('../models/QuizModel');

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
			return (
				<div className="quiz-container">
					<div key={quiz.id}>
						<div>{quiz.get('quizTitle')}</div>
						<div>{quiz.get('totalQuestions')}</div>
						<div>{quiz.get('startTime').toString()}</div>
						<div>{quiz.get('expireTime').toString()}</div>
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
