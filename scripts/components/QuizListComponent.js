// Pulling data from Quiz Model to get information on the Quiz Title,
// Total Number of Questions, Quiz Start Time and Quiz Expiration Time
// and displaying that information.

var React = require('react');
var QuizModel = require('../models/QuizModel');
var StudentAnswerModel = require('../models/StudentAnswerModel');
var QuestionModel = require('../models/QuestionModel');
var _ = require('backbone/node_modules/underscore');
var moment = require('moment');

module.exports = React.createClass({
	getInitialState: function(){
		return{
			quizList: []
		}
	},
	componentWillMount: function() {
        this.fetch();
	},
	render: function(){
		var _this = this;
		var quizzes = this.state.quizList.map(function(quiz){
			var startTime = quiz.get('startTime');
			var expireTime = quiz.get('expireTime');
			var button = '';
			if(quiz.taken){
				button = (<a href={"#quizResults/" + Parse.User.current().id +"/"+ quiz.id} ><button className="take-quiz">Quiz Results</button></a>)
			}else{

				button = (<a href={"#quizDetails/"+ quiz.id} ><button className="take-quiz">Take Quiz</button></a>)
			}


			return (
				<div key={quiz.id} className="quiz-margin-container">
					<div className="quiz-container">
						<div>
							<div className="quiz-title">
								{_this.capitalizeFirstLetter(quiz.get('quizTitle'))}
							</div>
							<hr />
							<div>Total Questions: {quiz.get('totalQuestions')}</div>
							<div className="quiz-start-expire"><span className="quiz-time-title">Start-Time</span>: {moment(startTime).format("MMMM Do, h:mm a")}</div>
							<div className="quiz-start-expire"><span className="quiz-time-title">Expire-Time</span>: {moment(expireTime).format("MMMM Do, h:mm a")}</div>
								{button}
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
						{quizzes}
					</div>
				</div>
			</div>
		)
	},
	fetch: function() {
        var _this = this;
        var finalQuizzes = [];
        var flag = false;
        var allTakenQuizzes = [];
        var currentCohort = Parse.User.current().get('cohortId');
        var quizQuery = new Parse.Query(QuizModel);
        quizQuery.equalTo('cohortId', currentCohort);
        quizQuery.descending("createdAt");
        quizQuery.limit(6);
        quizQuery.find().then(
            (allQuizzesForCohort) => {
                var takenQuery = new Parse.Query(StudentAnswerModel);
                takenQuery.equalTo('userId', Parse.User.current());
                takenQuery.find().then(
                    (currentStudentAnswers) => {
                        var questionQuery = new Parse.Query(QuestionModel);
                        questionQuery.find().then(
                            (questions) => {
                                for(var i = 0; i < currentStudentAnswers.length; i++){
                                    for(var j = 0; j < questions.length; j++){
                                        if( currentStudentAnswers[i].get('questionId').id === questions[j].id){
                                            allTakenQuizzes.push(questions[j].get('quizId').id)
                                        }
                                    }
                                }
                                var cleanedTakenQuizzes = _.uniq(allTakenQuizzes);
                                allQuizzesForCohort.forEach(function(quiz){
                                   for(var y = 0; y < cleanedTakenQuizzes.length; y++){
                                       flag = false;
                                       if( _.contains(quiz, cleanedTakenQuizzes[y])){
                                           flag = true
                                       }
                                   }
                                    if(flag){
                                        var extra = [];
                                        extra.push(quiz);
                                        flag = false
                                    }else{
                                        finalQuizzes.push(quiz);
                                    }
                                });
                                this.setState({quizList: finalQuizzes})
                            }
                        );

                    }
                );
            },
            (err) => {
                console.log(err)
            }
        );
    },
	capitalizeFirstLetter: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
	}

});
