'use strict';
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');
window.$ = require('jquery');
window.jquery = $;


Parse.initialize('qy4WDiTUAsyns9L817gjZdVf1aEQTetovh1yNDTk', 'xrkwhyHvS5Y9od0EWmN9hd0ssv28caF4YATtQaPJ');

var RegisterComponent = require('./components/RegisterComponent');
var NavigationComponent = require('./components/NavigationComponent');
var LoginComponent = require('./components/LoginComponent');
var QuizListComponent = require('./components/QuizListComponent');
var PostQuestionComponent = require('./components/PostQuestionComponent');

var app = document.getElementById('app');

var Router = Backbone.Router.extend({
	routes: {
		'': 'home',
		'dashboard': 'dashboard',
		'login': 'login',
		'register': 'register',
		'postQuestionComponent': 'postQuestionComponent',
		'logout': 'home'

	},
	home: function() {
		React.render(<HomeComponent />, app);
	},
	dashboard: function() {
		React.render(<DashboardComponent router={r} />, app);
	},
	login: function() {
		React.render(<LoginComponent router={r} />, app);
	},
	register: function() {
		React.render(<RegisterComponent router={r} />, app);
	},
	createQuestion: function() {
		React.render(<PostQuestionComponent/>, app);
	},
});

var r = new Router();
Backbone.history.start();

ReactDOM.render(
	<NavigationComponent router={r} />,
	document.getElementById('nav')
);
