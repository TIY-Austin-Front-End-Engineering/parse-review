/*
 *  Footer Component
 *
 *  requires:
 *      React
 *
 *  Appears on each page
 *  Links to the development team responsible for this masterpiece
 *
 */

var React = require('react');
var ReactDOM = require('react-dom');
var CreditsComponent = require('./CreditsComponent');

module.exports = React.createClass({
    render: function() {

        return (
            <div className="footer-container">
            	<ul className="footer-links">
	                <li>Built at <a href="http://www.theironyard.com">The Iron Yard-Austin</a> in 2015</li>
	                <li><a href="#credits">Credits</a></li>
                </ul>
            </div>
        );
    }
});
