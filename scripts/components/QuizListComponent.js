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
				<div>
					<div>{quiz.get('quizTitle')}</div>
					<div>{quiz.get('totalQuestions')}</div>
					<div>{quiz.get('startTime')}</div>
					<div>{quiz.get('expireTime')}</div>
				</div>
				)
		})
		return(
			<div className="QuizListComponent">
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
