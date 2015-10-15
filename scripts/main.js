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

var app = document.getElementById('app');


var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'dashboard': 'dashboard',
		'login': 'login',
		'register': 'register',
		'quizList': 'quizList',
		'createQuiz': 'createQuiz',
		'editQuiz/:id':'editQuiz',
		'editQuiz/:id/postQuestion':'postQuestion',
		'quizResults/:id': 'quizResults',
		'logout': 'logout',
		'classAnalytics': 'classAnalytics',
		'quizResults/:userId/:quizId': 'quizResults',
		'studentAnalytics': 'studentAnalytics',
		'quizDetails/:id':'quizDetailsPage',
		'attendance': 'attendance'
	},
	quizDetailsPage: function(id){
		ReactDOM.render(<QuizDetailsComponent quizId={id}  router={r}/>, app);
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
	createQuiz: function() {
		var currentUser = Parse.User.current();
		console.log('post question',currentUser.id);
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<CreateQuizComponent router={r}/>, app);
		}
		else {
			this.navigate('', {trigger: true});
		}
	},
	editQuiz:function(id){
		var currentUser = Parse.User.current();
		console.log('post question',currentUser.id);
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<EditQuizComponent quizId={id} router={r}/>, app);
		}
		else {
			this.navigate('', {trigger: true});
		}
	},
	postQuestion: function(id) {
		var currentUser = Parse.User.current();
		console.log('post question',currentUser.id);
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<PostQuestionComponent quizId={id} router={r}/>, app);
		}
		else {
			this.navigate('', {trigger: true});
		}
	},
	quizResults: function(userId, quizId) {
		var currentUser = Parse.User.current();
		console.log(currentUser.get('teacher'), currentUser.id);
		if(currentUser.get('teacher')) {
			ReactDOM.render(<QuizResultsComponent quizId={id}/>, app);
		} 
		else {
			ReactDOM.render(<h1>Access Denied, Contact Administrator</h1>, app);
			}	
	},
	logout: function() {
		Parse.User.logOut();
		this.navigate('', {trigger: true});
	},
	attendance: function() {
		var currentUser = Parse.User.current();
		console.log(currentUser.get('teacher'), currentUser.id);
		if(currentUser.get('teacher')) {
			ReactDOM.render(<AttendanceComponent/>, app);
		} 
		else {
			ReactDOM.render(<h1>Access Denied, Contact Administrator</h1>, app);
		}
	},
	quizList: function() {
		var currentUser = Parse.User.current();
		if(currentUser) {
			ReactDOM.render(<QuizListComponent />, app);
		}
		else {
			this.navigate('', {trigger: true});
		}
	},
	classAnalytics: function() {
		var currentUser = Parse.User.current();
		console.log('post question',currentUser.id);
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<ClassAnalyticsComponent router={r}/>, app);
		}
		else {
			this.navigate('', {trigger: true});
		}
	},
	studentAnalytics: function() {
		var currentUser = Parse.User.current();
		console.log('post question',currentUser.id);
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<StudentAnalyticsComponent />, app);
		}
		else {
			this.navigate('', {trigger: true});
		}
	},
	dashboard: function() {
		var currentUser = Parse.User.current();
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<DashboardComponent />, app);
		}
		else {
			this.navigate('', {trigger: true});
		}
	},
});

var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);
