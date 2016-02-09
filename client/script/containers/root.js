import React, { Component } from 'react'
import { flash, symbols } from '../actions'
import Chart from '../components/chart'
import Symbol from '../components/symbol'
import Search from '../components/search'
import connect from '../utils/connect'

export class Root extends Component {
  // getChildContext() {
  //   return { store: this.store }
  // }

  constructor(props) {
    super(props)
    this.props.populateSymbols()
    this.store = this.props.store
    this.addSymbol = this.addSymbol.bind(this)
  }

  addSymbol(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.props.getSymbol(e.target.value)
    }
  }

  renderSymbolBoxes() {
    const { store } = this.props
    return this.props.data.map((info) => {
      return <Symbol className="col-sm-4 symbolbox" key={info.symbol} info={info} store={store} />
    })
  }

  render() {
    const { store } = this.props
    return (
      <div className="container">
        <Chart data={this.props.data}/>
        <div className="row symbols">
          {this.renderSymbolBoxes()}
          <Search className="col-sm-4 symbolbox" key="search" data={this.props.data} store={store} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    flash: state.message,
    data: state.data.symbols
  }
}

export default connect(mapStateToProps, {
  resetMessage: flash.resetMessage,
  populateSymbols: symbols.populateSymbols,
  getSymbol: symbols.getSymbol
})(Root)
