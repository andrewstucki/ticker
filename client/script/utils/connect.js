import React, { Component } from 'react'
import { bindActionCreators } from 'redux';

export default (mapStateToProps, injectedProps) => ConnectedComponent => class extends Component {
  constructor(props) {
    super(props)
    const { store } = (this.context && this.context.store) ? this.context : this.props
    this.store = store
    this.state = {}
  }

  trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.store.subscribe(this.handleChange.bind(this))
      this.handleChange()
    }
  }

  tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe()
      this.unsubscribe = null
    }
  }

  handleChange() {
    if (!this.unsubscribe) {
      return
    }

    const prevStoreState = this.state.storeState
    const storeState = this.store.getState()

    if (prevStoreState !== storeState) this.setState({ storeState })
  }

  componentDidMount() {
    this.trySubscribe()
  }

  componentWillUnmount() {
    this.tryUnsubscribe()
  }

  render() {
    if (typeof injectedProps === 'undefined' && typeof mapStateToProps !== 'function') {
      return <ConnectedComponent {...this.props} {...bindActionCreators(mapStateToProps, this.store.dispatch)} />
    }
    return <ConnectedComponent {...this.props} {...bindActionCreators(injectedProps, this.store.dispatch)} {...mapStateToProps(this.store.getState())} />
  }
}
