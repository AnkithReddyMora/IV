function initScatterPlot(data) {
    const svgContainer = d3.select("#chart-container");
    const tooltip = d3.select(".tooltip");

    // Set dimensions and margins of the scatter plot
    const margin = {top: 20, right: 30, bottom: 100, left: 60}, 
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    const svgScatter = svgContainer.append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScatter = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.Horsepower)])
        .range([0, width]);

    svgScatter.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(xScatter));
    // X-axis label for scatter plot
    svgScatter.append("text")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom - 20)
    .text("Horsepower");
    
    const yScatter = d3.scaleLinear()
        .domain([0, d3.max(data, d => +d.Weight)])
        .range([height, 0]);

    svgScatter.append("g")
        .call(d3.axisLeft(yScatter));
    // Y-axis label for scatter plot
    svgScatter.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -margin.left + 15)
    .attr("x", -height / 2)
    .attr("text-anchor", "middle")
    .text("Weight");

    svgScatter.selectAll(".dot")
        .data(data)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("cx", d => xScatter(+d.Horsepower))
        .attr("cy", d => yScatter(+d.Weight))
        .attr("r", 5)
        .attr("fill", "navy")
        .on("mouseover", function(event, d) {
            tooltip.html(`Horsepower: ${d.Horsepower}<br>Weight: ${d.Weight}`)
                .style("opacity", 1)
                .style("left", `${event.pageX + 10}px`)
                .style("top", `${event.pageY + 20}px`);
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
        });
}
