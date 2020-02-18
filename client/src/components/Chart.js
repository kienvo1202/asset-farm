import React from 'react';
// import { scaleLinear, scaleTime } from 'd3-scale';
// import { max } from 'd3-array';
// import { select } from 'd3-selection';
import {
  select,
  scaleLinear,
  scaleTime,
  extent,
  axisLeft,
  axisBottom,
  line,
  curveBasis
} from 'd3';
import axios from 'axios';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.createChart = this.createChart.bind(this);
  }
  componentDidMount() {
    this.createChart(this.props.data);
  }
  componentDidUpdate() {
    this.createChart(this.props.data);
  }

  createChart(data) {
    const node = this.node;
    const svg = select(node);
    const xValue = d => d.month;
    const yValue = d => d.best;
    const meanValue = d => d.mean;
    const bestValue = d => d.best;
    const worstValue = d => d.worst;

    const margin = { top: 50, right: 50, bottom: 80, left: 100 };
    const innerWidth = 900 - margin.left - margin.right;
    const innerHeight = 600 - margin.top - margin.bottom;
    const xAxisLabel = 'Month';
    const yAxisLabel = '';

    const xScale = scaleTime()
      .domain(extent(data, xValue))
      .range([0, innerWidth])
      .nice();

    const yScale = scaleLinear()
      .domain([100000000, 600000000])
      .range([innerHeight, 0])
      .nice();

    const lineGenerator1 = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(meanValue(d)))
      .curve(curveBasis);
    const lineGenerator2 = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(bestValue(d)))
      .curve(curveBasis);
    const lineGenerator3 = line()
      .x(d => xScale(xValue(d)))
      .y(d => yScale(worstValue(d)))
      .curve(curveBasis);

    const g = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const xAxis = axisBottom(xScale)
      .tickSize(-innerHeight)
      .tickPadding(15);

    const yAxis = axisLeft(yScale)
      .tickSize(-innerWidth)
      .tickPadding(10);

    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();

    yAxisG
      .append('text')
      .attr('class', 'axis-label')
      .attr('y', -60)
      .attr('x', -innerHeight / 2)
      .attr('fill', 'black')
      .attr('transform', `rotate(-90)`)
      .attr('text-anchor', 'middle')
      .text(yAxisLabel);

    const xAxisG = g
      .append('g')
      .call(xAxis)
      .attr('transform', `translate(0,${innerHeight})`);

    xAxisG.select('.domain').remove();

    xAxisG
      .append('text')
      .attr('class', 'axis-label')
      .attr('y', 80)
      .attr('x', innerWidth / 2)
      .attr('fill', 'black')
      .text(xAxisLabel);

    g.append('path')
      .attr('class', 'line-path')
      .attr('d', lineGenerator1(data))
      .attr(
        'style',
        'fill:none;stroke:maroon;stroke-width:3;stroke-linejoin:round'
      );

    g.append('path')
      .attr('class', 'line-path')
      .attr('d', lineGenerator2(data))
      .attr(
        'style',
        'fill:none;stroke:maroon;stroke-width:0.5;stroke-linejoin:round'
      );

    g.append('path')
      .attr('class', 'line-path')
      .attr('d', lineGenerator3(data))
      .attr(
        'style',
        'fill:none;stroke:maroon;stroke-width:0.5;stroke-linejoin:round'
      );
  }
  render() {
    return (
      <div>
        <h2 onClick={this.props.getChartDataToState}>Chart test</h2>
        <svg ref={node => (this.node = node)} width={900} height={600}></svg>
      </div>
    );
  }
}

export default Chart;
