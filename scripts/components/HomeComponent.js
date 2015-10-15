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
								<span>Content</span>
							</div>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="four columns">
					column one
					</div>
					<div className="four columns">
					columns two
					</div>
					<div className="four columns">
					columns three
					</div>
				</div>
			</div>
		)
	}
});
