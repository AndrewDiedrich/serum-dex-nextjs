import { H1, Button, Intent } from '@blueprintjs/core'
import Link from 'next/link'
import MarketHighlights from './MarketHighlights'
import MarketTable from './MarketTable'

const Markets = () => {
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
      <MarketHighlights />
      <MarketTable />
    </div>
  )
}

export default Markets
