function initBarChart(data) {
    const svgContainer = d3.select("#chart-container");
    const tooltip = d3.select(".tooltip");

    // Aggregate data by Origin for the bar chart
    const originCounts = Array.from(d3.rollup(data, v => v.length, d => d.Origin), ([key, value]) => ({key, value}));

    // Set dimensions and margins of the bar chart
    const margin = {top: 20, right: 30, bottom: 100, left: 60}, 
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    const svgBar = svgContainer.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xBar = d3.scaleBand()
        .range([0, width])
        .domain(originCounts.map(d => d.key))
        .padding(0.1);

    svgBar.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xBar));
    // X-axis label for bar chart
    svgBar.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 20)
    .text("Origin");

    const yBar = d3.scaleLinear()
        .domain([0, d3.max(originCounts, d => d.value)])
        .range([height, 0]);

    svgBar.append("g")
        .call(d3.axisLeft(yBar));
    // Y-axis label for bar chart
    svgBar.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 15)
    .attr("x", -height / 2)
    .attr("text-anchor", "middle")
    .text("Count of Manufacturer");
    
    svgBar.selectAll(".bar")
        .data(originCounts)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => xBar(d.key))
        .attr("width", xBar.bandwidth())
        .attr("y", d => yBar(d.value))
        .attr("height", d => height - yBar(d.value))
        .attr("fill", "#69b3a2")
        .on("mouseover", function(event, d) {
            tooltip.html(`Origin: ${d.key}<br>Count: ${d.value}`)
                .style("opacity", 1)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 20}px`);
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
        });
}
