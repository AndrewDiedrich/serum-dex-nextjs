import { useLocalStorageState } from './utils'
import { Account, AccountInfo, Connection, PublicKey } from '@solana/web3.js'
import React, { useContext, useEffect, useMemo, useRef } from 'react'
import { setCache, useAsyncData } from './fetch-loop'
import tuple from 'immutable-tuple'
import { ConnectionState, EndpointInfo } from './types'
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil'
import { connectionState } from '../recoil/exchangeState'

export const ENDPOINTS: EndpointInfo[] = [
  {
    name: 'mainnet-beta',
    endpoint: 'https://solana-api.projectserum.com',
    custom: false,
  },
  { name: 'localnet', endpoint: 'http://127.0.0.1:8899', custom: false },
]

const accountListenerCount = new Map()

export function ConnectionProvider({ children }) {
  const [endpoint, _setEndpoint] = useLocalStorageState<string>('connectionEndpts', ENDPOINTS[0].endpoint)
  const [customEndpoints, _setCustomEndpoints] = useLocalStorageState<EndpointInfo[]>('customConnectionEndpoints', [])
  const availableEndpoints = ENDPOINTS.concat(customEndpoints)

  const connection = useMemo(() => new Connection(endpoint, 'recent'), [endpoint])
  const sendConnection = useMemo(() => new Connection(endpoint, 'recent'), [endpoint])

  const setConnectionState = useSetRecoilState(connectionState)
  // The websocket library solana/web3.js uses closes its websocket connection when the subscription list
  // is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
  // This is a hack to prevent the list from every getting empty
  useEffect(() => {
    const id = connection.onAccountChange(new Account().publicKey, () => {})
    return () => {
      connection.removeAccountChangeListener(id)
      setConnectionState(conn)
    }
  }, [connection])

  useEffect(() => {
    const id = connection.onSlotChange(() => null)
    return () => {
      connection.removeSlotChangeListener(id)
    }
  }, [connection])

  useEffect(() => {
    const id = sendConnection.onAccountChange(new Account().publicKey, () => {})
    return () => {
      sendConnection.removeAccountChangeListener(id)
    }
  }, [sendConnection])

  useEffect(() => {
    const id = sendConnection.onSlotChange(() => null)
    return () => {
      sendConnection.removeSlotChangeListener(id)
    }
  }, [sendConnection])
}

export function useConnection() {
  const context = useRecoilValue(connectionState)
  if (!context) {
    throw new Error('Missing connection context')
  }
  return context.connection
}

export function useSendConnection() {
  const context = useRecoilValue(connectionState)
  if (!context) {
    throw new Error('Missing connection context')
  }
  return context
}

export function useConnectionConfig() {
  const context = useRecoilValue(connectionState)
  if (!context) {
    throw new Error('Missing connection context')
  }
  return {
    endpoint: context.endpoint,
    endpointInfo: context.availableEndpoints.find((info) => info.endpoint === context.endpoint),
    // setEndpoint: context.setEndpoint,
    availableEndpoints: context.availableEndpoints,
    // setCustomEndpoints: context.setCustomEndpoints,
  }
}

export function useAccountInfo(
  publicKey: PublicKey | undefined | null
): [AccountInfo<Buffer> | null | undefined, boolean] {
  const connection = useConnection()
  const cacheKey = tuple(connection, publicKey?.toBase58())
  const [accountInfo, loaded] = useAsyncData<AccountInfo<Buffer> | null>(
    async () => (publicKey ? connection.getAccountInfo(publicKey) : null),
    cacheKey,
    { refreshInterval: 60_000 }
  )
  useEffect(() => {
    if (!publicKey) {
      return
    }
    if (accountListenerCount.has(cacheKey)) {
      const currentItem = accountListenerCount.get(cacheKey)
      ++currentItem.count
    } else {
      let previousInfo: AccountInfo<Buffer> | null = null
      const subscriptionId = connection.onAccountChange(publicKey, (info) => {
        if (!previousInfo || !previousInfo.data.equals(info.data) || previousInfo.lamports !== info.lamports) {
          previousInfo = info
          setCache(cacheKey, info)
        }
      })
      accountListenerCount.set(cacheKey, { count: 1, subscriptionId })
    }
    return () => {
      const currentItem = accountListenerCount.get(cacheKey)
      const nextCount = currentItem.count - 1
      if (nextCount <= 0) {
        connection.removeAccountChangeListener(currentItem.subscriptionId)
        accountListenerCount.delete(cacheKey)
      } else {
        --currentItem.count
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cacheKey])
  const previousInfoRef = useRef<AccountInfo<Buffer> | null | undefined>(null)
  if (
    !accountInfo ||
    !previousInfoRef.current ||
    !previousInfoRef.current.data.equals(accountInfo.data) ||
    previousInfoRef.current.lamports !== accountInfo.lamports
  ) {
    previousInfoRef.current = accountInfo
  }
  return [previousInfoRef.current, loaded]
}

export function useAccountData(publicKey) {
  const [accountInfo] = useAccountInfo(publicKey)
  return accountInfo && accountInfo.data
}
