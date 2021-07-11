/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useState, useRef } from 'react'
import { Classes, Card } from '@blueprintjs/core'
import { useOrderbook } from '../../../utils/markets'
import BookRow from './bookRow'
import SpreadRow from './spreadRow'

export enum ESides {
  ask = 'ask',
  bid = 'bid',
}
export interface ISpreadData {
  pct: number | undefined
  diff: number | undefined
  last: number | undefined
  side: ESides | undefined
}

export interface IBookSide {
  price: number | undefined
  size: number | undefined
  total: number | undefined
}

interface IOrderBookData {
  market: string
  totalBidSize: number
  totalAskSize: number
  spread: ISpreadData
  asks: Array<IBookSide>
  bids: Array<IBookSide>
}

const Orderbook = () => {
  const orderbookRef = useRef<HTMLDivElement>(null)
  const [rows, setRows] = useState<IOrderBookData>()
  const [rowDisplayNum, setRowDisplayNum] = useState<number>(0)
  console.log('orderbook!!!!', useOrderbook())
  useEffect(() => {
    const height = orderbookRef.current?.clientHeight! - 30 - 41
    const rowsForAvailableHeight = Math.floor(Math.floor(height / 21) / 2)
    setRowDisplayNum(rowsForAvailableHeight)
  }, [orderbookRef.current?.clientHeight])

  const rowSkeleton = (side: string) => {
    return (
      <>
        <p key={`${side}-1`} className={Classes.SKELETON}>
          date: price row valkjlskdjflskdf
        </p>
        <p key={`${side}-2`} className={Classes.SKELETON}>
          date: price row valkjlskdjflskdf
        </p>
        <p key={`${side}-3`} className={Classes.SKELETON}>
          date: price row valkjlskdjflskdf
        </p>
      </>
    )
  }

  const renderAskRows = () => {
    return rows?.asks.slice(-rowDisplayNum).map((row: any, index: number) => {
      return (
        <>
          <BookRow
            index={index}
            row={row}
            side={'asks'}
            widthPercent={Math.round((row.size / rows.totalAskSize) * 100)}
            color={'rgb(219, 55, 55, 0.45)'}
          />
        </>
      )
    })
  }

  const renderBidRows = () => {
    return rows?.bids.slice(0, rowDisplayNum).map((row: any, index: number) => {
      return (
        <>
          <BookRow
            index={index}
            row={row}
            side={'bids'}
            widthPercent={Math.round((row.size / rows.totalBidSize) * 100)}
            color={'rgb(74, 165, 41, 0.45)'}
          />
        </>
      )
    })
  }

  const content = (
    <div className="orderbook" ref={orderbookRef}>
      {rows ? (
        <>
          <table className="bp3-html-table bp3-small bp3-interactive bp3-html-table-striped">
            <thead>
              <tr>
                <th>Order Size</th>
                <th>Price</th>
                <th>Size</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{rows.asks && rows.asks.length > 0 ? renderAskRows() : rowSkeleton('ask')}</tbody>
          </table>
          <SpreadRow spreadData={rows.spread} />
          <table className="bp3-html-table bp3-small bp3-interactive bp3-html-table-striped">
            <thead style={{ display: 'none' }}>
              <tr>
                <th>Order Size</th>
                <th>Price</th>
                <th>Size</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{rows.bids && rows.bids.length > 0 ? renderBidRows() : rowSkeleton('bid')}</tbody>
          </table>
        </>
      ) : (
        rowSkeleton('bid')
      )}
    </div>
  )

  return <Card>{content}</Card>
}

export default Orderbook
