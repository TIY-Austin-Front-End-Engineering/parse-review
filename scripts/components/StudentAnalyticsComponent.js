//The StudentAnalyticsComponent
//The needed properties are the StudentAnswerModel and the QuestionModel for determining the correctly associated questions and answers.

var React = require('react');
var QuestionModel = require('../models/QuestionModel')
var query = new Parse.Query(StudentAnswerModel);
var innerQuery = new Parse.Query(QuestionModel);
