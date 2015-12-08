"use strict";
var d3 = require("d3");
var vsprintf = require("sprintf-js").vsprintf;

export default function main(args) {
	var container = args[0];

	var margin = {top: 20, right: 20, bottom: 70, left: 40},
		 width = 600 - margin.left - margin.right,
		 height = 300 - margin.top - margin.bottom;

	// Parse the date / time
	var parseDate = d3.time.format("%Y-%m").parse;

	var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis()
		 .scale(x)
		 .orient("bottom")
		 .tickFormat(d3.time.format("%Y-%m"));

	var yAxis = d3.svg.axis()
		 .scale(y)
		 .orient("left")
		 .ticks(10);

	var svg = d3.select(container).append("svg")
		 .attr("width", width + margin.left + margin.right)
		 .attr("height", height + margin.top + margin.bottom)
		 .append("g")
		 .attr("transform", 
				 "translate(" + margin.left + "," + margin.top + ")");

	var data = transformData(getData());

	function transformData( data ) {
		return __recur( [], data );

		function __recur( newData, oldData ) {
			if (oldData.length === 0)
				return newData;

			let head = oldData[0];
			let tail = oldData.slice(1);

			let item = {
				date: parseDate( head.date ),
				value: 2*head.value
			};

			return __recur( 
				newData.concat( item ),
				tail );
		}
	}
		
	  x.domain(data.map(function(d) { return d.date; }));
	  y.domain([0, d3.max(data, function(d) { return d.value; })]);

	  svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
		 .selectAll("text")
			.style("text-anchor", "end")
			.attr("dx", "-.8em")
			.attr("dy", "-.55em")
			.attr("transform", "rotate(-90)" );

	  svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
		 .append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Value ($)");

	  svg.selectAll("bar")
			.data(data)
		 .enter().append("rect")
			.style("fill", "steelblue")
			.attr("x", function(d) { return x(d.date); })
			.attr("width", x.rangeBand())
			.attr("y", function(d) { return y(d.value); })
			.attr("height", function(d) { return height - y(d.value); });

}

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
/*
export default function main(args) {
	var container = args[0];

	var margin = {
		top: 20,
		right: 10,
		bottom: 20,
		left: 10
	};

	var width = 960 - margin.left - margin.right;
	var height = 500 - margin.top - margin.bottom;

	var translate = vsprintf("translate(%s,%s)", [margin.left, margin.top]);

	var svg =  d3.select(container)
		.append("svg")
			.attr("id", "svg")
			.attr("width", width)
			.attr("height", height)
		.append("g")
			.attr("id", "g")
			.attr("transform", translate)
		.selectAll("circle")
			.data( getPoints(10) )
			.enter()
		.append("circle")
			.attr("cx", p => p.x)
			.attr("cy", p => p.y)
			.attr("r", "20")
			.attr("fill", "red");

	function getPoints(n) {
		return __recur([], n);

		function __recur(array, n) {
			if( n <= 0 )
				return array;

			var cx = round(Math.random() * width);
			var cy = round(Math.random() * height);

			var point = {x:cx, y:cy};

			return __recur(
				array.concat(point),
				n-1);
		}
	}

	function round(num) {
		var num = Math.round(num);
		var digit = num%100;
		return num - digit
	}
}
*/
