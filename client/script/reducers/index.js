import { combineReducers } from 'redux'
import { assign } from 'lodash/object'
import { constants, flash } from '../actions'

function addOrUpdateSymbol(symbols, info) {
  let index
  symbols.forEach((s, i) => {
    if (s.symbol !== info.symbol) return
    index = i
  })
  if (typeof index !== 'undefined') symbols[index] = info
  else symbols.push(info)
  return symbols
}

function removeSymbol(symbols, info) {
  let index
  symbols.forEach((s, i) => {
    if (s.symbol !== info) return
    index = i
  })
  if (typeof index !== 'undefined') symbols.splice(index, 1)
  return symbols
}

function data(state = { symbols: [], symbolsLoaded: false }, action) {
  const { type, value, data, symbol } = action
  switch(type) {
    case constants.POPULATE_SUCCESS:
      return {
        symbols: value,
        symbolsLoaded: true
      }
    case constants.ADD_SYMBOL:
      return assign({}, state, { symbols: addOrUpdateSymbol(state.symbols, data) })
    case constants.REMOVE_SYMBOL:
      return assign({}, state, { symbols: removeSymbol(state.symbols, symbol) })
  }
  return state
}

function message(state = null, action) {
  const { type, value, error } = action
  switch(type) {
    case constants.RESET_MESSAGE:
    case "@@reduxReactRouter/routerDidChange":
      return null
    case constants.SET_MESSAGE:
      return value
    default:
      if (error) return {
        type: flash.ERROR,
        message: error
      }
  }
  return state
}

export default combineReducers({
  data,
  message,
})
