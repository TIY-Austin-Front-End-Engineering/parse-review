var React = require('react');
var Backbone = require('backbone');


module.exports = React.createClass({
    render: function() {
    	var questionChoices: [];
        return (
            	<form>
            		<input type="text" ref="questionTitle" className="validate" />
            		<input type="text" ref="questionContent" className="validate" />
            		<input type="text" ref="choices" className="validate" />
            		<input type="text" ref="choices" className="validate" />
            		<input type="text" ref="choices" className="validate" />
            		<input type="text" ref="choices" className="validate" />
            		<input type="text" ref="questionAnswer" className="validate" />
            		<button>Submit Question</button>
            	</form>

        );
    }
});

