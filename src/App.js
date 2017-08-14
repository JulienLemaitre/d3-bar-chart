import React, { Component } from 'react';
import BarChart from './components/bar-chart';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: {}
    };

    this.getDatas = this.getDatas.bind(this);
    this.sendNewDatas = this.sendNewDatas.bind(this);
  }

  componentDidMount() {
    this.getDatas();
  }

  getDatas() {
    const self = this;
    axios.get('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json')
      .then(function (response) {
        // console.log("response:", response);
        self.sendNewDatas(response);
      })
      .catch(function (error) {
        window.console.log("error:", error);
      });
  }

  sendNewDatas(response) {
    const datas = response.data;
    console.log("response datas:", datas);
    this.setState({ datas: datas });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>D3 Bar Chart</h2>
        </div>
        <BarChart
          datas = {this.state.datas}
        />
      </div>
    );
  }
}

export default App;
