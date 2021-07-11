import Desktop from './layouts/Desktop/Desktop'
// import Orderbook from './Orderbook'
// import { useMarkPrice } from '../../utils/markets'
import MarketInfo from './MarketInfo'
import RecentTrades from './RecentTrades'

const Exchange = () => {
  // const price = useMarkPrice()
  // console.log('price', price)
  return (
    <>
      <Desktop />
      {/* <MarketInfo /> */}
      {/* <Orderbook /> */}
      {/* <RecentTrades /> */}
      {/* <HTMLTable>{price}</HTMLTable> */}
    </>
  )
}

export default Exchange
