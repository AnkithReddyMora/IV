import * as d3 from 'https://cdn.skypack.dev/d3@7';

fetch('https://raw.githubusercontent.com/AnkithReddyMora/IV/main/a1-cars.csv')
  .then(response => response.text())
  .then(data => {
    const parsedData = d3.csvParse(data);
    const width = 800;
    const height = 600;

    const svg = d3.create('svg')
      .attr('width', width)
      .attr('height', height);

    const chartContainer = d3.select('#chart')
      .append(() => svg.node());

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(parsedData, d => d.count)])
      .range([50, width - 50]);

    const yScale = d3.scaleBand()
      .domain(Array.from(new Set(parsedData.map(d => d.origin))))
      .range([height - 50, 50])
      .padding(0.1);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${height - 50})`)
      .call(xAxis);

    svg.append('g')
      .attr('transform', `translate(50, 0)`)
      .call(yAxis);

    const circles = svg.selectAll('circle')
      .data(parsedData)
      .join('circle')
      .attr('cx', d => xScale(d.count))
      .attr('cy', d => yScale(d.origin))
      .attr('r', 5)
      .style('fill', 'steelblue');

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 20)
      .attr('text-anchor', 'middle')
      .text('Count of Manufacturers');

    svg.append('text')
      .attr('x', -height / 2)
      .attr('y', 30)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Origin');
  })
  .catch(error => console.error('Error loading CSV data:', error));