import React, { Component } from 'react'
import { assign } from 'lodash/object'
import Highstock from 'highstock-release'
import theme from '../utils/theme'

Highstock.setOptions(theme)

const options = {
  rangeSelector: {
    selected: 4
  },
  title: {
    text: 'Stock Market Data'
  },
  yAxis: {
    plotLines: [{
      value: 0,
      width: 2,
      color: 'silver'
    }]
  },
  xAxis: {
    type: 'datetime'
  },
  plotOptions: {
    series: {
      compare: 'percent'
    }
  },
  tooltip: {
    pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
    valueDecimals: 2
  }
}

export default class Chart extends Component {
  constructor(props) {
    super(props)
  }

  renderChart() {
    const node = document.getElementById('chart')
    if (!node) return
    let seriesOptions = []
    this.props.data.forEach(info => {
      seriesOptions.push({
        name: info.symbol,
        data: info.data
      })
    })
    const config = assign({}, options, {
      series: seriesOptions,
      chart: {
        renderTo: 'chart'
      }
    })
    this.chart = new Highstock.StockChart(config)
  }

  componentDidMount() {
    this.renderChart()
  }

  componentDidUpdate() {
    this.renderChart()
  }

  render() {
    return <div className="chart" id="chart" ref='chart'></div>
  }
}
