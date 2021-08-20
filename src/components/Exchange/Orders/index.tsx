import { useState } from 'react'
import { Tabs, Tab } from '@blueprintjs/core'
import OpenOrdersTable from './rows/openOrder'

enum EUserOrderTabs {
  openOrders = 'Open Orders',
  orderHistroy = 'Order History',
}

enum OrderTypes {
  LIMIT = 'Limit',
}

export enum Side {
  BUY = 'buy',
  SELL = 'Sell',
}

export interface Order {
  symbol: string
  side: Side
  type: OrderTypes
  size: number
  price: number
}

interface IHeader {
  text: string
  isSortable: boolean
  key: string
}

export const headers: Array<IHeader> = [
  {
    text: 'Symbol',
    isSortable: true,
    key: 'symbol',
  },
  {
    text: 'Side',
    isSortable: true,
    key: 'side',
  },
  {
    text: 'Type',
    isSortable: true,
    key: 'Type',
  },
  {
    text: 'Size',
    isSortable: true,
    key: 'size',
  },
  {
    text: 'Price',
    isSortable: true,
    key: 'price',
  },
  {
    text: 'Set Price',
    isSortable: false,
    key: 'setPrice',
  },
  {
    text: 'Cancel',
    isSortable: false,
    key: 'cancel',
  },
]

const openOrders: Order[] = [
  {
    symbol: 'SRMUSDC',
    side: Side.BUY,
    type: OrderTypes.LIMIT,
    size: 123,
    price: 123,
  },
  {
    symbol: 'SRMUSDC',
    side: Side.SELL,
    type: OrderTypes.LIMIT,
    size: 123,
    price: 123,
  },
  {
    symbol: 'SRMUSDC',
    side: Side.BUY,
    type: OrderTypes.LIMIT,
    size: 123,
    price: 123,
  },
  {
    symbol: 'SRMUSDC',
    side: Side.BUY,
    type: OrderTypes.LIMIT,
    size: 123,
    price: 123,
  },
]

const Orders = (): JSX.Element => {
  // const [tabId, setTabId] = useState<EUserOrderTabs>(EUserOrderTabs.openOrders);

  // const content = (
  //   <Tabs id="TabsExample" className="mr-2 ml-2" onChange={(e: EUserOrderTabs) => setTabId(e)} selectedTabId={tabId}>
  //     <Tab id={EUserOrderTabs.openOrders} title={EUserOrderTabs.openOrders + ' ' + '8'} />
  //     <Tab id={EUserOrderTabs.orderHistroy} title={EUserOrderTabs.orderHistroy} />
  //   </Tabs>
  // );

  return <OpenOrdersTable data={openOrders} headers={headers} />
}

export default Orders
