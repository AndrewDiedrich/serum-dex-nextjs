/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect } from 'react'
import Exchange from '../../src/components/Exchange'
import { useSetRecoilState } from 'recoil'
import { exchangeMarketState, availableMarketsState } from '../../src/recoil/exchangeState'
import { useMarketsList } from '../../src/utils/markets'
import { DEFAULT_MARKET } from '../../src/utils/markets'
import 'react-mosaic-component/react-mosaic-component.css'

export const ExchangePage = (): JSX.Element => {
  const setMarketState = useSetRecoilState(exchangeMarketState)
  const setAvailableMarketsState = useSetRecoilState(availableMarketsState)
  useEffect(() => {
    const markets = useMarketsList()

    setMarketState({
      address: DEFAULT_MARKET?.address!,
      name: DEFAULT_MARKET?.name!,
      programId: DEFAULT_MARKET?.programId!,
      deprecated: DEFAULT_MARKET?.deprecated!,
      quoteLabel: DEFAULT_MARKET?.quoteLabel,
      baseLabel: DEFAULT_MARKET?.baseLabel,
    })
    setAvailableMarketsState(markets)
  }, [])
  return (
    <div style={{ minHeight: '80vh' }}>
      <Exchange />
    </div>
  )
}

export default ExchangePage
