import { atom, selector } from 'recoil'
import { Connection } from '@solana/web3.js'
import { WalletState, ConnectionState, PreferencesState, MarketState } from '../utils/types'
import { Market } from '@project-serum/serum'

export const exchangeMarketState = atom({
  key: 'exchangeMarketState',
  default: {} as MarketState,
})

export const exchangeMarketInfo = selector({
  key: 'exchangeInfo',
  get: ({ get }) => ({
    name: get(exchangeMarketState).name,
    // l1Orderbook: get(),
    // l2Orderbook: get(),
    // trades: get().filter((todo) => todo.completed).length,
    // openOrders: get().filter((todo) => !todo.completed).length,
  }),
})

export const availableMarketsState = atom({
  key: 'availableMarketsState',
  default: [] as Market[],
})

export const walletState = atom({
  key: 'walletState', // unique ID (with respect to other atoms/selectors)
  default: {} as WalletState,
})

export const connectionState = atom({
  key: 'connectionState', // unique ID (with respect to other atoms/selectors)
  default: {
    endpoint: 'https://solana-api.projectserum.com',
    connection: new Connection('https://solana-api.projectserum.com', 'recent'),
    availableEndpoints: [
      {
        name: 'mainnet-beta',
        endpoint: 'https://solana-api.projectserum.com',
        custom: false,
      },
      { name: 'localnet', endpoint: 'http://127.0.0.1:8899', custom: false },
    ],
  },
})

export const connectionStateSelector = selector({
  key: 'connectionStateSelector',
  get: ({ get }) => ({
    endpoint: get(connectionState).endpoint,
    connection: get(connectionState).connection,
  }),
  // set: ({set}, newEndpoint) => set(connectionState, newEndpoint),
})

export const preferencesState = atom({
  key: 'preferencesState', // unique ID (with respect to other atoms/selectors)
  default: {} as PreferencesState,
})

export const darkModeState = atom({
  key: 'darkModeState', // unique ID (with respect to other atoms/selectors)
  default: true,
})
