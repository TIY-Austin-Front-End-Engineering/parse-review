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
var PostQuestionComponent = require('./components/PostQuestionComponent');
var AttendanceComponent = require('./components/AttendanceComponent');
var QuizResultsComponent = require('./components/QuizResultsComponent');
var HomeComponent = require('./components/HomeComponent');
var ClassAnalyticsComponent = require('./components/ClassAnalyticsComponent');
var DashboardComponent = require('./components/DashboardComponent');
var StudentAnalyticsComponent = require('./components/StudentAnalyticsComponent');

var currentUser = Parse.User.current();
var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'dashboard': 'dashboard',
		'login': 'login',
		'register': 'register',
		'quizList': 'quizList',
		'postQuestion': 'postQuestion',
		'quizResults/:id': 'quizResults',
		'logout': 'logout',
		'classAnalytics': 'classAnalytics',
		'quizResults/:userId/:quizId': 'quizResults',
		'studentAnalytics': 'studentAnalytics',
		'quizDetails/:id':'quizDetailsPage',
		'attendance': 'attendance'
	},
	quizDetailsPage: function(id){
		ReactDOM.render(<QuizDetailsComponent quizId={id}  quizIsFinished={quizFinished}/>, app);
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
	postQuestion: function() {
		if(currentUser && currentUser.get('teacher') === true) {
			ReactDOM.render(<PostQuestionComponent/>, app);
		}
		else {
			this.navigate('', {trigger: true});
		}
	},
	quizResults: function(userId, quizId) {
		ReactDOM.render(<QuizResultsComponent userId={userId} quizId={quizId} />, app);
	},
	logout: function() {
		Parse.User.logOut();
		this.navigate('', {trigger: true});
	},
	attendance: function() {
		console.log(currentUser.get('teacher'), currentUser.id);
		if(currentUser.get('teacher')) {
		ReactDOM.render(<AttendanceComponent/>, app);
	} else {
		ReactDOM.render(<h1>Access Denied, Contact Administrator</h1>, app);
	}
	},
	quizList: function() {
		ReactDOM.render(<QuizListComponent />, app);
	},
	classAnalytics: function() {
		ReactDOM.render(<ClassAnalyticsComponent />, app);
	},
	studentAnalytics: function() {
		ReactDOM.render(<StudentAnalyticsComponent />, app);
	},
	dashboard: function() {
		// if(currentUser && currentUser.get('teacher') === true) {
		// 	ReactDOM.render(<DashboardComponent router={r} />, app);
		// }
		// else {
		// 	this.navigate('', {trigger: true});
		// }
		ReactDOM.render(<DashboardComponent />, app);
	}
});

var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);
