import React, {Component} from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.drawChart = this.drawChart.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    const useProps = nextProps.datas;
    this.drawChart(useProps);

    return false;
  }

  drawChart(useProps) {
    const datas = useProps.data;

    const width = 800;
    const height = 600;
    const margin = {top: 20, bottom: 20, right: 20, left: 20};
    const rectWidth = (width - margin.left - margin.right) / datas.length;

    let svg = d3.select(this.svg)
      .attr('width', width)
      .attr('height', height);

    let parseDatas = [];
    datas.forEach(d => {
      let date = d[0].split("-").join(" ");
      date = new Date(date);
      let gdp = d[1];
      parseDatas.push({ date, gdp });
    });

    console.log("parseDatas:", parseDatas);

    // Scales
    const xExtent = d3.extent(parseDatas, d => d.date);
    const xScale = d3.scaleTime()
      .domain(xExtent)
      .range([margin.left, width - margin.right]);

    const yExtent = d3.extent(parseDatas, d => d.gdp);
    const yScale = d3.scaleLinear()
      .domain(yExtent)
      .range([margin.bottom, height - margin.top]);

    svg.selectAll('rect')
      .data(parseDatas, d => d.date)
      .enter().append('rect')
      .attr('x', d => xScale(d.date))
      .attr('y', d => height - margin.bottom - yScale(d.gdp))
      .attr('width', rectWidth)
      .attr('height', d => yScale(d.gdp))
      .attr('fill', 'blue');
  }

  render() {
    return (
      <svg
        ref={(svg => this.svg = svg)}
      ></svg>
    );
  }
}

export default BarChart;