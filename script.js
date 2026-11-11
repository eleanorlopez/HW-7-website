const data = [
  { month: "Sept", games: 5 },
  { month: "Oct", games: 6 },
  { month: "Nov", games: 8 },
  { month: "Dec", games: 4 }
];

const margin = { top: 20, right: 20, bottom: 40, left: 50 };
const width = 600 - margin.left - margin.right;
const height = 350 - margin.top - margin.bottom;

const svg = d3.select("#chart")
  .append("svg")
  .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const x = d3.scaleBand()
  .domain(data.map(d => d.month))
  .range([0, width])
  .padding(0.2);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.games)])
  .nice()
  .range([height, 0]);

svg.append("g")
  .attr("transform", `translate(0,${height})`)
  .call(d3.axisBottom(x));

svg.append("g").call(d3.axisLeft(y));

svg.selectAll(".bar")
  .data(data)
  .join("rect")
  .attr("class", "bar")
  .attr("x", d => x(d.month))
  .attr("y", d => y(d.games))
  .attr("width", x.bandwidth())
  .attr("height", d => height - y(d.games))
  .attr("fill", "#2d6a4f");