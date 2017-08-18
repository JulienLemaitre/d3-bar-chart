import React, { Component } from 'react';
import axios from 'axios';
import * as d3 from 'd3';
import BarChart from './components/bar-chart';
import Tooltip from './components/tooltip';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: {},
      tooltipOn: false,
      tooltipLeft: 0,
      tooltipTop: 0,
      tooltipDate: "",
      tooltipGdp: ""
    };

    this.getDatas = this.getDatas.bind(this);
    this.sendNewDatas = this.sendNewDatas.bind(this);
    this.onRectHover = this.onRectHover.bind(this);
    this.onRectOut = this.onRectOut.bind(this);
  }

  componentDidMount() {
    this.getDatas();
  }

  getDatas() {
    const self = this;
    axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
      .then(function (response) {
        self.sendNewDatas(response);
      })
      .catch(function (error) {
        window.console.log("error:", error);
      });
  }

  sendNewDatas(response) {
    const datas = response.data;
    this.setState({ datas: datas });
  }

  onRectHover(d, tooltipX, tooltipY) {
    clearTimeout(this.tooltipTimeout);
    let { date, gdp } = d;
    date = d3.timeFormat("%B %Y")(date);
    this.setState({
      tooltipOn: true,
      tooltipLeft: tooltipX,
      tooltipTop: tooltipY,
      tooltipDate: date,
      tooltipGdp: gdp
    });
  }

  onRectOut() {
    this.tooltipTimeout = setTimeout( () => {
      this.setState({tooltipOn: false})
    }, 300);
  }

  render() {
    let descSplit = [];
    if (this.state.datas.description)
      descSplit = this.state.datas.description.split(/\n/);

    let description = descSplit.map((sentence, index) => {
      return <p key={index}>{sentence}</p>;
    });

    return (
      <div className="App">
        <div className="App-header">
          <h2>D3 Bar Chart</h2>
        </div>
        <div className="App-body">
          <BarChart
            datas = {this.state.datas}
            onRectHover = {this.onRectHover}
            onRectOut = {this.onRectOut}
          />
          <Tooltip
            tooltipOn={this.state.tooltipOn}
            date={this.state.tooltipDate}
            gdp={this.state.tooltipGdp}
            left={this.state.tooltipLeft}
            top={this.state.tooltipTop}
          />
          <div className="legend">
            {description}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
