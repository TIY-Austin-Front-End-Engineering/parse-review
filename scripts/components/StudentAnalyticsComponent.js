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
var _ = require('backbone/node_modules/underscore');

module.exports = React.createClass({
    getInitialState: function () {
        return {
            students: [],
            answers: [],
            quizzes: []
        };
    },
    componentWillMount: function() {
        var query = new Parse.Query(Parse.User);
        query.equalTo('teacher', false).find().then((students) => {
            this.setState({students: students});
        },
        (err) => {
            console.log(err);
        })
    },
    render: function() {
        var studentOptions = this.state.students.map((student) => {
            return (
                <option value={student.id} key={student.id}>{student.get('firstName')+ ' '+student.get('lastName')}</option>
            )
        });
        var quizList = this.state.quizzes.map(function(quiz) {
            return(
                <tbody>
                    <tr>
                        <td>{quiz.get('quizTitle')}</td>
                    </tr>
                </tbody>
            )
        })
        var results = (
            <table className="u-full-width att-table">
                <thead>
                    <tr>
                        <th>Quiz</th>
                        <th>Score</th>
                        <th>Date Taken</th>
                    </tr>
                    {quizList}
                </thead>
            </table>
        )
        return (
            <div className="att-container">
                <h1>Student Analytics</h1>
                <form onSubmit={this.onStudentSelect}>
                    <label htmlFor="students">Select Student</label>
                    <select className="u-full-width" id="exampleRecipientInput" ref="studentPick">
                        {studentOptions}
                    </select>
                    <button className="att-butt">Submit</button>
                </form>
                {results}
            </div>
        );
    },
    onStudentSelect: function(e) {
        e.preventDefault();
        console.log(this.refs.studentPick.value);
        var query = new Parse.Query(StudentAnswerModel);
        query.include('questionId');
        query.include('userId');
        query.equalTo('userId', new Parse.User({objectId: this.refs.studentPick.value}));
        query.find().then(
            (studentAnswers) => {
                var answersByQuiz = _.groupBy(studentAnswers, function(answer) {
                    return answer.get('questionId').get('quizId').id;
                })
                console.log(answersByQuiz);
                // this.setState({answers: answers});
            },
            (err) => {
                console.log(err);
            })
        var quizQuery = new Parse.Query(QuizModel);
        quizQuery.find().then(
            (quizzes) => {
                this.setState({quizzes: quizzes});
            }
        )
    }
});