import { ApiPromise, WsProvider } from '@polkadot/api'
/* eslint-disable @typescript-eslint/no-var-requires */
const default_endpoint = 'ws://localhost:9944'

const endpoint = localStorage.getItem('endpoint')
if (!endpoint || typeof endpoint !== 'string' || endpoint.indexOf('ws') !== 0) {
	localStorage.setItem('endpoint', default_endpoint)
}

// eslint-disable-next-line prettier/prettier
const wsProvider = new WsProvider(localStorage.getItem('endpoint'))
const api = ApiPromise.create({ provider: wsProvider })

//const util = require("@polkadot/util");
export default api
