import { Card, H2 } from '@blueprintjs/core'

const MarketHighlights = (): JSX.Element => {
  const data = [
    {
      market: 'sol/usd',
      price: 123.23,
      vol: 1231,
      change: 2.23,
      percentChange: 1.24,
    },
  ]
  const hightlight = () => {
    return data.map((market) => {
      return (
        <Card key={market + 'hight-card'}>
          <H2>{market.market}</H2>
        </Card>
      )
    })
  }
  return <div>{hightlight()}</div>
}

export default MarketHighlights
