import React, {Component} from 'react';
import * as d3 from 'd3';

class BarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.drawChart = this.drawChart.bind(this);
  }

  componentDidUpdate() {
    this.drawChart();
  }

  drawChart() {
    let svg = d3.select('svg');
  }

  render() {
    return (
      <svg></svg>
    );
  }
}

export default BarChart;