/*
 *  HomeComponent
 *
 *  This is what shows when navigating to the site for the first time
 *  Requires no properties
 *
 */

'use strict';
var React = require('react');

module.exports = React.createClass({
	render: function() {
		return(
			<div className="home-container-component">
				<div className="img-box u-max-full-width">
					<div className="mask">
						<div className="row">
							<div className="three columns">
								<div className="brand-title">Iron Quizzes</div>
							</div>
							<div className="nine columns">
								<div className="home-content">
								<p>Iron Quizzes is a secure, professional web-based quiz service that is easy-to-use,
								for both students and Instructors. Instructors will be able to create quizzes, quick and easy,
								 while also keeping track of the info you need. From analytics to student attendance, this will be the app you CANT LIVE WITHOUT.
								</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="four columns">
						<div className="home-card">
							<img src="../images/classAttendance.png" className="u-max-full-width" />
							<div className="home-card-text">
								<h3>Class Attendance</h3>
								<hr />
								<p>No longer will you have to keep track of class attendance!
								 Our Class Attendance tool does that for you, with simple to understand mechanics! You can then spend the time that you saved making more quizzes!
								 </p>
							</div>
						</div>
					</div>
					<div className="four columns">
						<div className="home-card">
							<img src="../images/createQuiz.png" className="u-max-full-width" />
							<div className="home-card-text">
								<h3>Quiz Creation</h3>
								<hr />
								<p>Iron Quizzes is all about striving to make the instructors life easier, and our Quiz Creation tool is gonna do that!
								With simple to follow instructions, you will have students answering your quiz in no time at all!
								</p>
							</div>
						</div>
					</div>
					<div className="four columns">
						<div className="home-card">
							<img src="../images/quizList.png" className="u-max-full-width" />
							<div className="home-card-text">
								<h3>Quiz Taking</h3>
								<hr />
								<p>Your students will be saying WOW! after they see how easy it is to take a quiz.
								Iron Quizzes takes the hassle of setting up to take a quiz.
								 Your students will have so much free time, maybe they could take more quizzes?
								 </p>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
});
