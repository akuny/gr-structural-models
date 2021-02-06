const app = (function(d3) {

  const margin = {
    top: 50, 
    right: 50, 
    bottom: 150, 
    left: 150
  };

  const width = 600 - margin.left - margin.right;
  const height = 600 - margin.top - margin.bottom;

  const svg = d3.select('#root')
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform',
            `translate(${margin.left}, ${margin.top})`);

  const render = (data) => {

    document.getElementById('root').innerHTML = 'A nice chart will live here.'

  }

  d3.json('/data.json').then(data => render(data.pages));

})(d3);
