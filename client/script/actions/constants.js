export const API_ROOT = (process.env.NODE_ENV === "production") ? process.env.API_URL || '/api/v1' : '/api/v1'

//Symbols
export const GET_REQUEST = 'GET_REQUEST'
export const GET_SUCCESS = 'GET_SUCCESS'
export const GET_FAILURE = 'GET_FAILURE'
export const POPULATE_REQUEST = 'POPULATE_REQUEST'
export const POPULATE_SUCCESS = 'POPULATE_SUCCESS'
export const POPULATE_FAILURE = 'POPULATE_FAILURE'
export const DELETE_REQUEST = 'DELETE_REQUEST'
export const DELETE_SUCCESS = 'DELETE_SUCCESS'
export const DELETE_FAILURE = 'DELETE_FAILURE'
export const ADD_SYMBOL = 'ADD_SYMBOL'
export const REMOVE_SYMBOL = 'REMOVE_SYMBOL'

//Flash
export const RESET_MESSAGE = 'RESET_MESSAGE'
export const SET_MESSAGE = 'SET_MESSAGE'
