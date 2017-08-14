import React, { Component } from 'react';
import BarChart from './components/bar-chart';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      datas: {}
    };
  }

  componentDidMount() {
    this.getDatas();
  }

  getDatas() {

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>D3 Bar Chart</h2>
        </div>
        <BarChart />
      </div>
    );
  }
}

export default App;
