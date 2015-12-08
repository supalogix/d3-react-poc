var d3Chart = require("./d3Chart");
var React = require("react");
var ReactDOM = require("react-dom");

export default class Chart extends React.Component {
	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		let el = ReactDOM.findDOMNode(this);

		d3Chart.create(
			el,
			this.props, 
			this.getChartState());
	}

	componentDidUpdate() {
		let el = ReactDOM.findDOMNode(this);
		d3Chart.update(el, this.getChartState());
	}

	componentWillUnmount() {
		let el = ReactDOM.findDOMNode(this);
		d3Chart.destroy(el);
	}

	getChartState() {
		return {
			data: this.props.data
		}
	}

	render() {
		return (
			<div id="chart"></div>
		);
	}
}
