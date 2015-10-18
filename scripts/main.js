'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;

Parse.initialize("CKo05MhMwPBIhtDVEPXIkPSdbEgeP66R6nm2HUjm", "DTN20m4e87Tffl5XmCXAjRMphFlikfqNhmTyU3Bq");

var RegisterComponent = require('./components/RegisterComponent');
var NavigationComponent = require('./components/NavigationComponent');
var LoginComponent = require('./components/LoginComponent');
var QuizListComponent = require('./components/QuizListComponent');
var CreateQuizComponent = require('./components/CreateQuizComponent');
var EditQuizComponent = require('./components/EditQuizComponent');
var PostQuestionComponent = require('./components/PostQuestionComponent');
var AttendanceComponent = require('./components/AttendanceComponent');
var QuizResultsComponent = require('./components/QuizResultsComponent');
var HomeComponent = require('./components/HomeComponent');
var ClassAnalyticsComponent = require('./components/ClassAnalyticsComponent');
var DashboardComponent = require('./components/DashboardComponent');
var StudentAnalyticsComponent = require('./components/StudentAnalyticsComponent');
var QuizDetailsComponent = require('./components/QuizDetailsComponent');
var CreateCohortComponent = require('./components/CreateCohortComponent');
var FooterComponent = require('./components/FooterComponent');
var CreditsComponent = require('./components/CreditsComponent');

var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'dashboard': 'dashboard',
		'login': 'login',
		'register': 'register',
		'cohortRegister/:id': 'cohortRegister',
		'quizList': 'quizList',
		'createQuiz': 'createQuiz',
		'editQuiz/:id':'editQuiz',
		'editQuiz/:id/postQuestion':'postQuestion',
		'logout': 'logout',
		'classAnalytics': 'classAnalytics',
		'quizResults/:userId/:quizId': 'quizResults',
		'studentAnalytics': 'studentAnalytics',
		'quizDetails/:id':'quizDetailsPage',
		'attendance': 'attendance',
		'createCohort': 'createCohort',
		'credits': 'credits'
	},
	quizDetailsPage: function(id){
		ReactDOM.render(<QuizDetailsComponent quizId={id}  router={r}/>, app);
	},
	createCohort: function() {
		var currentUser = Parse.User.current();
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<CreateCohortComponent />, app)
		} else {
			ReactDOM.render(<a className="moveAlong404"href=""><img src="images/move-along-404.jpg"/><p>Moving Along</p></a>, app);
		}
	},
	home: function() {
		ReactDOM.render(<HomeComponent />, app);
	},
	login: function() {
		ReactDOM.render(<LoginComponent router={r} />, app);
	},
	register: function() {
		ReactDOM.render(<RegisterComponent router={r} />, app);
	},
	cohortRegister: function(cohortId) {
		var currentUser = Parse.User.current();
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<RegisterComponent router={r} cohortId={cohortId} />, app);
		} else {
			ReactDOM.render(<div className="moveAlong404"><a href=""><img src="images/move-along-404.jpg"/><p>Moving Along</p></a></div>, app);
		}
	},
	createQuiz: function() {
		var currentUser = Parse.User.current();
		console.log('post question',currentUser.id);
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<CreateQuizComponent router={r}/>, app);
		}
		else {
			ReactDOM.render(<div className="moveAlong404"><a href=""><img src="images/move-along-404.jpg"/><p>Moving Along</p></a></div>, app);
		}
	},
	editQuiz:function(id){
		var currentUser = Parse.User.current();
		console.log('post question',currentUser.id);
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<EditQuizComponent quizId={id} router={r}/>, app);
		}
		else {
			ReactDOM.render(<div className="moveAlong404"><a href=""><img src="images/move-along-404.jpg"/><p>Moving Along</p></a></div>, app);
		}
	},
	postQuestion: function(id) {
		var currentUser = Parse.User.current();
		console.log('post question',currentUser.id);
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<PostQuestionComponent quizId={id} router={r}/>, app);
		}
		else {
			ReactDOM.render(<div className="moveAlong404"><a href=""><img src="images/move-along-404.jpg"/><p>Moving Along</p></a></div>, app);
		}
	},
	quizResults: function(userId, quizId) {
		var currentUser = Parse.User.current();
		if(currentUser) {
			ReactDOM.render(<QuizResultsComponent userId={userId} quizId={quizId} router={r} />, app);
		}
		else {
			ReactDOM.render(<div className="moveAlong404"><a href=""><img src="images/move-along-404.jpg"/><p>Moving Along</p></a></div>, app);
		}
	},
	logout: function() {
		Parse.User.logOut();
		this.navigate('', {trigger: true});
	},
	attendance: function() {
		var currentUser = Parse.User.current();
		if(currentUser.get('teacher')) {
			ReactDOM.render(<AttendanceComponent/>, app);
		} else {
			ReactDOM.render(<div className="moveAlong404"><a href=""><img src="images/move-along-404.jpg"/><p>Moving Along</p></a></div>, app);
		}
	},
	quizList: function() {
		var currentUser = Parse.User.current();
		if(currentUser) {
			ReactDOM.render(<QuizListComponent />, app);
		}
		else {
			ReactDOM.render(<div className="moveAlong404"><a href=""><img src="images/move-along-404.jpg"/><p>Moving Along</p></a></div>, app);
		}
	},
	classAnalytics: function() {
		var currentUser = Parse.User.current();
		console.log('post question',currentUser.id);
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<ClassAnalyticsComponent router={r}/>, app);
		}
		else {
			ReactDOM.render(<div className="moveAlong404"><a href=""><img src="images/move-along-404.jpg"/><p>Moving Along</p></a></div>, app);
		}
	},
	studentAnalytics: function() {
		var currentUser = Parse.User.current();
		console.log('post question',currentUser.id);
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<StudentAnalyticsComponent />, app);
		}
		else {
			ReactDOM.render(<div className="moveAlong404"><a href=""><img src="images/move-along-404.jpg"/><p>Moving Along</p></a></div>, app);
		}
	},
	dashboard: function() {
		var currentUser = Parse.User.current();
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<DashboardComponent />, app);
		}
		else {
			ReactDOM.render(<div className="moveAlong404"><a href=""><img src="images/move-along-404.jpg"/><p>Moving Along</p></a></div>, app);
		}
	},
	credits: function() {
		ReactDOM.render(<CreditsComponent />, app);
	}
});

var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);

ReactDOM.render(
	<FooterComponent router={r} />,
	document.getElementById('footer')
);
