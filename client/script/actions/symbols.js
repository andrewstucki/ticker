import * as Constants from './constants'
import { api, handleError } from './api'

export function populateSymbols() {
  return (dispatch, getState) => {
    if (getState().symbolsLoaded) return
    dispatch({ type: Constants.POPULATE_REQUEST })
    return api('/data')
      .then(json => dispatch({ type: Constants.POPULATE_SUCCESS, value: json }))
      .catch(err => handleError(dispatch, Constants.POPULATE_FAILURE, err))
  }
}

export function deleteSymbol(symbol) {
  return (dispatch, getState) => {
    dispatch({ type: Constants.DELETE_REQUEST })
    return api(`/data/${symbol}`, { method: 'delete' })
      .then(json => dispatch({ type: Constants.DELETE_SUCCESS, value: json }))
      .catch(err => handleError(dispatch, Constants.DELETE_FAILURE, err))
  }
}

export function getSymbol(symbol) {
  return (dispatch, getState) => {
    dispatch({ type: Constants.GET_REQUEST })
    return api(`/data`, { method: 'post' }, { symbol })
      .then(json => dispatch({ type: Constants.GET_SUCCESS, value: json }))
      .catch(err => handleError(dispatch, Constants.GET_FAILURE, err))
  }
}

export function addSymbol(symbol, data) {
  return { type: Constants.ADD_SYMBOL, symbol, data }
}

export function removeSymbol(symbol) {
  return { type: Constants.REMOVE_SYMBOL, symbol }
}
