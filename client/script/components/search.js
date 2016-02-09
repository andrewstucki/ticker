import React, { Component } from 'react'
import connect from '../utils/connect'
import { symbols } from '../actions'

export class Search extends Component {
  constructor(props) {
    super(props)
    this.addSymbol = this.addSymbol.bind(this)
  }

  addSymbol(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.props.addSymbol(e.target.value)
    }
  }

  render() {
    const { className, data } = this.props
    return (
      <div className={className}>
        <div className="symbol">
          <input type="text" className="form-control add-symbol" placeholder="Enter a ticker symbol" onKeyDown={this.addSymbol} />
        </div>
      </div>
    )
  }
}

export default connect({
  addSymbol: symbols.getSymbol
})(Search)
