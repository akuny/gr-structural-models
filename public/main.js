const app = (function(d3) {

  const margin = {
    top: 20, 
    right: 50, 
    bottom: 20, 
    left: 250
  };

  const width = 1200 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  function handlePageClick(event, d) {

    document.getElementById('details').innerHTML = d.details;
    const activePages = document.querySelectorAll('.active-page');
    if (activePages.length > 0) {
      activePages.forEach((node, i) => node.classList.toggle('active-page'))
    }
    event.target.classList.toggle('active-page');

  }

  function render(data) {
    d3.select('#root').selectAll('*').remove();

    const svg = d3.select('#root')
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear()
      .domain([d3.min(data, (d) => d.number), d3.max(data, (d) => d.number) + 1])
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
      .attr('transform', 'translate(0, 0)')

    svg.selectAll()
      .data(data)
    .enter().append('rect')
      .attr('class', (d) => d.pov)
      .attr('x', (d) => xScale(d.number))
      .attr('width', width / data.length * 0.85) // TODO no magic number
      .attr('y', (d) => yScale(d.timePlace))
      .attr('height', yScale.bandwidth())
      .on('click', handlePageClick)
      .on('mouseover', (event, d) => {
        event.target.style.cursor = 'pointer';
      })

  }

  document.querySelectorAll('.dropdown-item').forEach((node, i) => {
    node.addEventListener('click', (event) => {
      const selectedOption = event.target.hash.substr(1);
      d3.json(`/data/${selectedOption}.json`).then(data => {
        document.getElementById('chartTitle').innerHTML = data.title;
        return render(data.pages);
      });
    });
  });
  
})(d3);
