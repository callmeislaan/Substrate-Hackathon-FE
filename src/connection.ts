import { ApiPromise, WsProvider } from '@polkadot/api'

const WS_NODE = 'ws://127.0.0.1:9944'
const getPolkadotAPI = async (): Promise<ApiPromise> => {
	const provider = new WsProvider(WS_NODE)
	const api = await ApiPromise.create({ provider })
	await api.isReady
	return api
}

export default getPolkadotAPI
