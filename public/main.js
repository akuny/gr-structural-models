const app = (function(d3) {

  const margin = {
    top: 50, 
    right: 50, 
    bottom: 50, 
    left: 250
  };

  const width = 1200 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svg = d3.select('#root')
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

  const render = (data) => {

    const xScale = d3.scaleLinear()
      .domain([d3.min(data, (d) => d.number), d3.max(data, (d) => d.number)])
      .range([0, width])

    const yScale = d3.scaleBand()
      .domain(data.map((d) => d.timePlace))
      .range([0, height])

    const xAxis = d3.axisBottom()
      .scale(xScale)
      .ticks(data.length)

    const yAxis = d3.axisLeft()
      .scale(yScale)

    svg.append('g')
      .call(xAxis)
      .attr('class', 'axis')
      .attr('transform', `translate(0, ${height})`)

    svg.append('g')
      .call(yAxis)
      .attr('class', 'axis')
      .attr('transform', `translate(0, 0)`)

    const tooltip = d3.select('body').append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    svg.selectAll('.bar')
      .data(data)
    .enter().append('rect')
      .attr('class', (d) => d.pov)
      .attr('x', (d) => xScale(d.number))
      .attr('width', width / data.length + 2) // TODO no magic number
      .attr('y', (d) => yScale(d.timePlace))
      .attr('height', yScale.bandwidth())
      .on('mouseover', (event, d) => {
        const height = d.details.length > 75 ? `${d.details.length}px` : '75px';
        const width = d.details.length > 200 ? `${d.details.length}px` : '200px';

        tooltip.transition()
          .duration(200)
          .style('opacity', 1);
          tooltip.html(d.details)
          .style('left', (event.pageX) + 'px')
          .style('top', (event.pageY - 28) + 'px')
          .style('height', height)
          .style('width', width)
        })
      .on('mouseout', function(d) {
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
        });
 
            
  }
  
  d3.json('/data.json').then(data => render(data.pages));

})(d3);
