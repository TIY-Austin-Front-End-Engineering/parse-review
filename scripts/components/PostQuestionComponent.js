var React = require('react');
var ReactDOM = require('')
var Backbone = require('backbone');


module.exports = React.createClass({
	getInitialState: function(){
		return (
			{choices: []}
		);
	},
    render: function() {
    	var choiceRows = this.state.choices.map(function(choice){
    		return(
    			<label>
    			<input type="radio" value={choice}/>
    			{newChoice}
    			</label>
    		)
    	});
        return (
            	<form>
            		<input type="text" ref="questionTitle" className="validate" />
            		<input type="text" ref="choice" className="validate" />

            		<button onClick = {this.onAddChoice}> Add Choice </button>
            			{choiceRows}
            		<input type="text" ref="questionAnswer" className="validate" />
            		<button>Submit Question</button>
            	</form>

        );
    }
    onSubmit: function(){

    },
    onAddChoice: function(){
    	var newChoice = this.refs.choice.value;
    	var currentChoices = this.state.choices;
    	currentChoices.push(newChoice);
    	this.setState({choices: currentChoices})
    	
	
    	
    }
});


