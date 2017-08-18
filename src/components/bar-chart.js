import React, { Component } from 'react';
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

    const legendY = "Units: Billions of Dollars";

    const margin = {top: 50, bottom: 20, right: 20, left: 50};
    const width = 900;
    const height = 400;
    const rectWidth = (width) / datas.length;

    // svg canvas
    let svg = d3.select(this.svg)
      .attr('width', width)
      .attr('height', height);

    // Datas
    let parseDatas = [];
    datas.forEach(d => {
      let date = d[0].split("-").join(" ");
      // date = d3.timeParse("%Y%m%d")(date);
      date = new Date(date);
      let gdp = d[1];
      parseDatas.push({ date, gdp });
    });

    // Title
    let title = svg.append('text')
      .attr('x', width / 2)
      .attr('y', margin.top)
      .attr('text-anchor', 'middle')
      .attr('fill', 'steelblue')
      .attr('class', 'title');
    // Title
    title.text(`USA Gross Domestic Product`);

    // Scales
    const xExtent = d3.extent(parseDatas, d => d.date);
    const xScale = d3.scaleTime()
      .domain(xExtent)
      .range([margin.left, width - margin.right]);

    const yMax = d3.max(parseDatas, d => d.gdp);
    const yScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([height - margin.bottom, margin.top]);

    const heightScale = d3.scaleLinear()
      .domain([0, yMax])
      .range([0, height - margin.bottom - margin.top]);

    // axis
    const xAxis = d3.axisBottom().scale(xScale);
    const yAxis = d3.axisLeft().scale(yScale);

    svg.append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis);

    let yAxisG = svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`);
    yAxisG.append('text')
      .attr('transform','rotate(-90)')
      .attr('y', '20')
      .attr('x', `${-margin.top}`)
      .style('text-anchor', 'end')
      .style('font-size', '16px')
      .attr('fill', 'black')
      .text(legendY);
    yAxisG.call(yAxis);

    // render rectangles
    svg.selectAll('rect')
      .data(parseDatas, d => d.date)
      .enter().append('rect')
      .attr('x', d => xScale(d.date))
      .attr('y', d => yScale(d.gdp))
      .attr('width', rectWidth)
      .attr('height', d => heightScale(d.gdp))
      .attr('fill', 'steelblue')
      .on('mouseover', (d) => {
        this.props.onRectHover(d, d3.event.pageX, d3.event.pageY);
      })
      .on('mouseout', () => {
        this.props.onRectOut();
      });
  }

  render() {
    return (
      <div
        className="chart">
        <svg
          ref={(svg => this.svg = svg)}
        ></svg>
      </div>
    );
  }
}

export default BarChart;