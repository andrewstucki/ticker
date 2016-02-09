import React, { Component } from 'react'
import connect from '../utils/connect'
import { symbols } from '../actions'

export class Symbol extends Component {
  constructor(props) {
    super(props)
    this.remove = this.remove.bind(this)
  }

  remove() {
    if (this.props.info) this.props.deleteSymbol(this.props.info.symbol)
  }

  render() {
    const {symbol, name} = this.props.info
    return (
      <div className={this.props.className}>
        <div className="symbol">
          <span className="symbol-clear" onClick={this.remove}>&times;</span>
          <h2 className="symbol-header">{symbol}</h2>
          <p className="symbol-description">{name}</p>
        </div>
      </div>
    )
  }
}

export default connect({
  deleteSymbol: symbols.deleteSymbol
})(Symbol)
