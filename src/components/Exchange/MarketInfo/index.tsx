import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { exchangeMarketState, availableMarketsState } from '../../../recoil/exchangeState'
import { MarketInfo } from '../../../utils/types'
import { Button, MenuItem, Card, H3 } from '@blueprintjs/core'
import { Select, ItemPredicate, ItemRenderer } from '@blueprintjs/select'

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

const FromSelect = Select.ofType<MarketInfo>()

const Orderbook = () => {
  const [market, setMarket] = useRecoilState(exchangeMarketState)
  const [markets] = useRecoilState(availableMarketsState)
  useEffect(() => {
    console.log('markets from list')
    console.log('market change', market)
  }, [])

  const renderMarkets: ItemRenderer<MarketInfo> = (market, { handleClick, modifiers }) => {
    if (!modifiers.matchesPredicate) {
      return null
    }
    const text = `${market.name}`
    return (
      <MenuItem
        active={modifiers.active}
        disabled={modifiers.disabled}
        // label={fleet.name.toString()}
        key={market.address.toBase58()}
        onClick={handleClick}
        text={text}
      />
    )
  }

  const filterMarkets: ItemPredicate<MarketInfo> = (query, market, _index, exactMatch) => {
    const normalizedTitle = market.name.toString()
    const normalizedQuery = query

    if (exactMatch) {
      return normalizedTitle === normalizedQuery
    } else {
      return `${market.name.toLowerCase()}`.indexOf(normalizedQuery) >= 0
    }
  }

  const handleMarketChange = (market: any) => {
    console.log(market)
    setMarket(market)
  }

  const initialMarketContent =
    markets.length < 1 ? <MenuItem disabled={true} text={`${markets.length} items loaded.`} /> : undefined

  return (
    <FromSelect
      disabled={false}
      itemRenderer={renderMarkets}
      itemPredicate={filterMarkets}
      items={markets}
      initialContent={initialMarketContent}
      noResults={<MenuItem disabled={true} text="No results." />}
      onItemSelect={handleMarketChange}
    >
      <Button text={market ? `${market.name}` : '(No selection)'} />
    </FromSelect>
  )
}

export default Orderbook
