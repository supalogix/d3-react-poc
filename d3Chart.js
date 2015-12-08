var d3 = require("d3");

class d3Chart {
	/**
	 * Create Chart
	 * ============
	 */
	create(el,props,state) {
		var margin = {top: 20, right: 20, bottom: 70, left: 40},
			 width = 600 - margin.left - margin.right,
			 height = 300 - margin.top - margin.bottom;


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

		var svg = d3.select(el).append("svg")
			 .attr("width", width + margin.left + margin.right)
			 .attr("height", height + margin.top + margin.bottom)
			 .append("g")
			 .attr("transform", 
					 "translate(" + margin.left + "," + margin.top + ")");
	
		// Parse the date / time
		var parseDate = d3.time.format("%Y-%m").parse;

		var data = transformData(state.data);

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

		this.update(el,state);
	}

	/**
	 * Update Chart
	 * ============
	 */
	update(el,state) {
	}

	/**
	 * Destroy Chart
	 * ============
	 */
	destroy(el) {
	}
}

export default new d3Chart();
