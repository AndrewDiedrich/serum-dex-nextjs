import { useEffect, useState, useRef } from 'react'
// import { useSocket } from 'src/hooks/use-socket'
import { Classes, Menu, Button, MenuItem, NumericInput, ControlGroup, Intent, Colors } from '@blueprintjs/core'
import BookRow from './bookRow'
import SpreadRow from './spreadRow'
import { Select, ItemPredicate, ItemRenderer } from '@blueprintjs/select'
import { Divider } from 'antd'

export enum ESides {
  ask = 'ask',
  bid = 'bid',
}

const markets = ['CHEXUSD', 'CHEXEOS', 'CHEXETH']

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

interface IUserOrders {
  price: number
  size: number | undefined
  side: ESides
}

enum EQtySize {
  A = 10,
  B = 100,
  C = 1000,
}

const data = {
  market: 'chex/usd',
  totalBidSize: 3213,
  totalAskSize: 32131,
  spread: { pct: 1.25, diff: 0.0123, last: 0.243, side: 'asks' },
  bids: [
    {
      price: 16250,
      size: 70000,
      total: 120000,
    },
    {
      price: 16240,
      size: 20000,
      total: 100000,
    },
    {
      price: 16230,
      size: 20000,
      total: 80000,
    },
    {
      price: 16220,
      size: 3000,
      total: 60000,
    },
    {
      price: 16210,
      size: 1000,
      total: 40000,
    },
  ],
  asks: [
    {
      price: 16250,
      size: 70000,
      total: 120000,
    },
    {
      price: 16240,
      size: 20000,
      total: 100000,
    },
    {
      price: 16230,
      size: 20000,
      total: 80000,
    },
    {
      price: 16220,
      size: 3000,
      total: 60000,
    },
    {
      price: 16210,
      size: 1000,
      total: 40000,
    },
  ],
}

const FromSelect = Select.ofType<any>()
const Orderbook = ({ closeOption, addPanelOption }: { closeOption?: any; addPanelOption?: any }) => {
  const orderbookRef = useRef<HTMLDivElement>(null)
  const [market, setMarket] = useState<string>('CHEXUSD')
  const [rows, setRows] = useState<IOrderBookData>()
  const [rowDisplayNum, setRowDisplayNum] = useState<number>(0)
  const [qtySize, setQtySize] = useState<EQtySize>(EQtySize.A)
  useEffect(() => {
    if (data) {
      // socket.on('connect', () => {
      //   // return { query: 'EOSUSD' };
      // });
      // socket.on('ORDER_BOOK_UPDATE', (payload: any) => {
      setRows(data)
      // });
    }
  }, [])

  useEffect(() => {
    const height = orderbookRef.current?.clientHeight! - 30 - 41
    const rowsForAvailableHeight = Math.floor(Math.floor(height / 21) / 2)
    setRowDisplayNum(rowsForAvailableHeight)
  }, [orderbookRef.current?.clientHeight])

  const renderUser: ItemRenderer<any> = (market, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    const text = `${market}`
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        // label={fleet.name.toString()}
        key={market}
        onClick={handleClick}
        text={text}
      />
    )
  }

  const filterMarkets: ItemPredicate<any> = (query, market, _index, exactMatch) => {
    const normalizedTitle = market.toString()
    const normalizedQuery = query

    if (exactMatch) {
      return normalizedTitle === normalizedQuery
    } else {
      return `${market.toLowerCase()}`.indexOf(normalizedQuery) >= 0
    }
  }

  const handleMarketChange = (market: any) => {
    setMarket(market)
  }

  const initialMarketContent = false ? <MenuItem disabled={true} text={`${markets.length} items loaded.`} /> : undefined

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

  const propertiesMenu = (
    <Menu>
      <MenuItem text="Add Orderbook" icon="add-row-bottom" onClick={() => addPanelOption('orderbook')} />
    </Menu>
  )

  const title = (
    <>
      Orderbook(
      <FromSelect
        // createNewItemFromQuery={maybeCreateNewItemFromQuery}
        // createNewItemRenderer={maybeCreateNewItemRenderer}
        disabled={false}
        itemRenderer={renderUser}
        // itemDisabled={this.isItemDisabled}
        // itemsEqual={areFilmsEqual}
        // we may customize the default filmSelectProps.items by
        // adding newly created items to the list, so pass our own
        itemPredicate={filterMarkets}
        items={markets}
        initialContent={initialMarketContent}
        noResults={<MenuItem disabled={true} text="No results." />}
        onItemSelect={handleMarketChange}
        // popoverProps={false}
      >
        <Button minimal text={market ? `${market}` : '(No selection)'} />
      </FromSelect>
      )
    </>
  )

  const content = (
    <div className="orderbook" ref={orderbookRef}>
      <div className="flexRow">
        {rows?.spread.last}({rows?.spread.pct}%)
      </div>
      <ControlGroup className="mt-10" style={{ justifyContent: 'center' }}>
        <Button intent={Intent.SUCCESS}>Market Buy</Button>
        <Button intent={Intent.DANGER}>Market Sell</Button>
      </ControlGroup>
      <ControlGroup className="mt-10" style={{ justifyContent: 'center' }}>
        <Button
          intent={qtySize === EQtySize.A ? Intent.PRIMARY : Intent.NONE}
          text="10"
          onClick={() => setQtySize(EQtySize.A)}
        />
        <Button
          intent={qtySize === EQtySize.B ? Intent.PRIMARY : Intent.NONE}
          text="100"
          onClick={() => setQtySize(EQtySize.B)}
        />
        <Button
          intent={qtySize === EQtySize.C ? Intent.PRIMARY : Intent.NONE}
          text="1000"
          onClick={() => setQtySize(EQtySize.C)}
        />
        <NumericInput stepSize={qtySize} />
      </ControlGroup>
      <div className="mt-10"></div>
      <label>
        Price
        <ControlGroup style={{ justifyContent: 'center' }}>
          <NumericInput />
          <Button intent={Intent.SUCCESS}>Limit Buy</Button>
          <Button intent={Intent.DANGER}>Limit Sell</Button>
        </ControlGroup>
      </label>
      <Divider className="m-10" />
      {rows ? (
        <>
          <table className="bp3-html-table bp3-small bp3-interactive bp3-html-table-striped">
            <thead>
              <tr>
                <th>Price</th>
                <th>Size</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{rows.asks && rows.asks.length > 0 ? renderAskRows() : rowSkeleton('ask')}</tbody>
          </table>
          {/* <SpreadRow spreadData={rows.spread} /> */}
          <table className="bp3-html-table bp3-small bp3-interactive bp3-html-table-striped">
            <thead style={{ display: 'none' }}>
              <tr>
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

  return content
}

export default Orderbook
