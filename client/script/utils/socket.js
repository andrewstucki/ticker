import { symbols } from '../actions'

export default class Socket {
  constructor(url, store) {
    const socketProtocol = window.location.protocol === "https:" ? 'wss' : 'ws'
    this.websocket = new WebSocket(`${socketProtocol}://${url}`, 'ticker')
    this.store = store
    const self = this
    this.websocket.onmessage = event => self.handleMessage(JSON.parse(event.data))
  }

  handleMessage(data) {
    if (data.type === 'remove') return this.store.dispatch(symbols.removeSymbol(data.symbol))
    if (data.type === 'add') return this.store.dispatch(symbols.addSymbol(data.symbol, data.data))
  }

  close() {
    this.websocket.close()
  }
}
