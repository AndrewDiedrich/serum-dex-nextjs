/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useRef } from 'react'
import { BonfidaTrade } from '../../../utils/types'
import { Icon, Spinner, Card } from '@blueprintjs/core'
import BonfidaApi from '../../../utils/bonfidaConnector'
import { useRecoilValue } from 'recoil'
import { exchangeMarketState } from '../../../recoil/exchangeState'

export interface ITradeHistory {
  quantity: number
  price: number
  time: string
  side: string
}

const RecentTrades = () => {
  const contentRef = useRef<HTMLDivElement>(null)
  const marketState = useRecoilValue(exchangeMarketState)
  const [scrollHeight, setScrollHeight] = useState<number>(0)
  const [rows, setRows] = useState<BonfidaTrade[] | null>([])

  useEffect(() => {
    // console.log('firing trades', marketState.address.toBase58())
    async function fetchTrades() {
      if (marketState.address) {
        const trades = await BonfidaApi.getRecentTrades(marketState.address.toBase58())
        setRows(trades)
      } else {
        setRows([])
      }
    }
    fetchTrades()
  }, [marketState])

  useEffect(() => {
    setScrollHeight(
      // @ts-ignore
      contentRef.current?.parentElement?.clientHeight - contentRef.current?.children[0].tHead.clientHeight
    )
  }, [contentRef.current?.parentElement?.clientHeight])

  const renderTableRows = () => {
    return rows ? (
      rows.slice(0, 20).map((row: BonfidaTrade, index: number) => {
        const change = index !== rows.length - 1 ? row.price - rows[index + 1].price : 0
        return (
          <tr
            key={`${row.size}-${row.price}-${row.time}`}
            className={
              row.side === 'buy'
                ? 'blinkPositiveValue'.concat(' recent-order-row-buy')
                : 'blinkNegativeValue'.concat(' recent-order-row-sell')
            }
          >
            <td>
              {row.price.toFixed(4)}
              {change !== 0 ? (
                <span style={{ paddingLeft: '10px', textAlign: 'right' }}>
                  {row.side === 'sell' ? (
                    <Icon icon="caret-up" color="#4aa529" />
                  ) : (
                    <Icon icon="caret-down" color="#db3737" />
                  )}
                  {Math.abs(change).toFixed(4)}
                </span>
              ) : null}
            </td>
            <td>{row.size.toFixed(3)}</td>
            <td>{row.time}</td>
          </tr>
        )
      })
    ) : (
      <Spinner />
    )
  }
  return (
    <Card>
      <div ref={contentRef}>
        <table className="bp3-html-table bp3-small bp3-interactive scroll">
          <thead>
            <tr>
              <th>Price</th>
              <th>Quantity</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody
            style={{
              maxHeight: `${scrollHeight}px`,
            }}
          >
            {renderTableRows()}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default RecentTrades
