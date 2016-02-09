// Based off: https://github.com/rackt/redux/blob/master/examples/real-world/index.js

import React from 'react'
import { render } from 'react-dom'

import Root from './containers/root'
import configureStore from './store/configureStore'
import Socket from './utils/socket'

if (process.env.NODE_ENV === 'production' && window.location.protocol !== "https:") window.location.href = `https:${window.location.href.substring(window.location.protocol.length)}`
if (process.env.NODE_ENV !== 'production') document.write('<script src="http://' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js"></' + 'script>')

const store = configureStore()
const socket = new Socket(window.location.host || 'localhost', store)
render(
  <Root store={store} />,
  document.getElementById('app')
)
