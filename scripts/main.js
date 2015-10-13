'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jQuery = $;

Parse.initialize('CKo05MhMwPBIhtDVEPXIkPSdbEgeP66R6nm2HUjm', 'DTN20m4e87Tffl5XmCXAjRMphFlikfqNhmTyU3Bq');

var RegisterComponent = require('./components/RegisterComponent');
var NavigationComponent = require('./components/NavigationComponent');
var LoginComponent = require('./components/LoginComponent');
var QuizListComponent = require('./components/QuizListComponent');
var CreateQuizComponent = require('./components/CreateQuizComponent');
var HomeComponent = require('./components/HomeComponent');

var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'dashboard': 'dashboard',
		'login': 'login',
		'register': 'register',
		'quizList': 'quizList',
		'createQuiz/:id': 'createQuiz',
		'quizResults/:id': 'quizResults',
		'logout': 'logout'
	},
	home: function() {
		ReactDOM.render(<HomeComponent />, app);
	},
	dashboard: function() {
		// ReactDOM.render(<DashboardComponent router={r} />, app);
	},
	login: function() {
		ReactDOM.render(<LoginComponent router={r} />, app);
	},
	register: function() {
		ReactDOM.render(<RegisterComponent router={r} />, app);
	},
	createQuiz: function() {
		ReactDOM.render(<CreateQuizComponent />, app);
	},
	quizResults: function(id) {
		// ReactDOM.render(<QuizResultsComponent/>, app);
	},
	logOut: function() {
		Parse.User.logOut();
		this.navigate('home', {trigger: true} );
	},
	quizList: function() {
		ReactDOM.render(<QuizListComponent />, app);
	}
});

var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);
