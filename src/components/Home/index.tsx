import { useEffect, useState } from 'react'
import { H1, Button, Intent } from '@blueprintjs/core'
import Link from 'next/link'
import MarketHighlights from './MarketHighlights'
import MarketTable from './MarketTable'
import BonfidaApi from '../../utils/bonfidaConnector'
import { useRecoilState } from 'recoil'
import { availableMarketsState } from '../../recoil/exchangeState'

export interface WSMarkets {
  bestAsk: string[]
  bestBid: string[]
  market: string
  slot: number
  timestamp: string
  type: string
}

export interface ChartData {
  date: string
  bid: number
}

const Markets = () => {
  const [data1, setData1] = useState<any[]>()
  const [data2, setData2] = useState<any[]>()
  const [markets] = useRecoilState(availableMarketsState)
  // connect to hosted demo server
  // if connecting to serum-vial server running locally
  // const ws = new WebSocket('ws://localhost:8000/v1/ws')
  useEffect(() => {
    // console.log('firing trades', marketState.address.toBase58())
    async function fetchTrades() {
      const topMarkets = markets.slice(0, 3)
      const list = []
      if (topMarkets.length > 0) {
        const trades1 = await BonfidaApi.getRecentTrades(topMarkets[0].address.toBase58())
        setData1(trades1?.slice(0, 20))
        const trades2 = await BonfidaApi.getRecentTrades(topMarkets[1].address.toBase58())
        setData2(trades2?.slice(0, 20))
      } else {
        setData1([])
        setData2([])
      }
    }
    fetchTrades()
  }, [])

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{}}>
        <H1>SpotLight</H1>
        <Link href="/exchange/solusd">
          <Button intent={Intent.PRIMARY} rightIcon="timeline-area-chart">
            Exchange
          </Button>
        </Link>
      </div>
      <MarketHighlights data1={data1} data2={data2} />
      <MarketTable />
    </div>
  )
}

export default Markets
