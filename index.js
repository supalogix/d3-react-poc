import main from "./src/main.js";

var ReactDOM = require("react-dom");
var React = require("react");
var Chart = require("./Chart");

var container = document.getElementById("container");
var args = [ container ];

//main(args);

class Main extends React.Component {
	render() {
		return (
			<div>Hello World</div>
		);
	}
}


var data = getData();

ReactDOM.render(<Chart data={data} />, 
	document.getElementById("container"));

function getData() {

	function getRandomNumber() {
		return Math.random() * 100;
	}

	var data = [
		{ "date": "2013-01", "value": getRandomNumber() },
		{ "date": "2013-02", "value": getRandomNumber() },
		{ "date": "2013-03", "value": getRandomNumber() },
		{ "date": "2013-04", "value": getRandomNumber() },
		{ "date": "2013-05", "value": getRandomNumber() },
		{ "date": "2013-06", "value": getRandomNumber() },
		{ "date": "2013-07", "value": getRandomNumber() },
		{ "date": "2013-08", "value": getRandomNumber() },
		{ "date": "2013-09", "value": getRandomNumber() },
		{ "date": "2013-10", "value": getRandomNumber() },
		{ "date": "2013-11", "value": getRandomNumber() },
		{ "date": "2013-12", "value": getRandomNumber() },
		{ "date": "2014-01", "value": getRandomNumber() },
		{ "date": "2014-02", "value": getRandomNumber() }
	];

	return data;
}
