function initBubbleChart(data) {
    const svgContainer = d3.select("#chart-container");
    const tooltip = d3.select(".tooltip");

    // Set dimensions and margins
    const margin = {top: 20, right: 40, bottom: 60, left: 60},
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    // Bubble Chart SVG
    const svgBubble = svgContainer.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // Create scales
    const x = d3.scaleLinear()
        .domain([d3.min(data, d => +d.Weight), d3.max(data, d => +d.Weight)])
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain([d3.min(data, d => +d.MPG), d3.max(data, d => +d.MPG)])
        .range([height, 0]);

    const z = d3.scaleSqrt()
        .domain([d3.min(data, d => +d.Horsepower), d3.max(data, d => +d.Horsepower)])
        .range([2, 20]); // Adjust the range for visual appearance

    // Add X axis
    const xAxis = svgBubble.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));
    xAxis.append("text")
        .attr("class", "axis-label")
        .attr("text-anchor", "end")
        .attr("x", width)
        .attr("y", 50) // Position the x-axis label below the axis
        .text("Weight");

    // X-axis label for bubble chart
    svgBubble.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 20)
    .text("Weight");

    // Add Y axis
    const yAxis = svgBubble.append("g")
        .call(d3.axisLeft(y));
    yAxis.append("text")
        .attr("class", "axis-label")
        .attr("transform", "rotate(-90)")
        .attr("y", -50) // Position the y-axis label to the left of the axis
        .attr("x", -height / 2)
        .attr("text-anchor", "middle")
        .text("MPG");

    // Y-axis label for bubble chart
    svgBubble.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 15)
    .attr("x", -height / 2)
    .attr("text-anchor", "middle")
    .text("MPG");

    // Add a scale for bubble size
    svgBubble.selectAll(".bubble")
        .data(data)
        .enter().append("circle")
        .attr("class", "bubble")
        .attr("cx", d => x(+d.Weight))
        .attr("cy", d => y(+d.MPG))
        .attr("r", d => z(+d.Horsepower))
        .style("fill", "#69b3a2")
        .style("opacity", "0.7")
        .on("mouseover", function(event, d) {
            tooltip.html(`Weight: ${d.Weight}<br>MPG: ${d.MPG}<br>Horsepower: ${d.Horsepower}`)
                .style("opacity", 1)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 20}px`);
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
        });
}
