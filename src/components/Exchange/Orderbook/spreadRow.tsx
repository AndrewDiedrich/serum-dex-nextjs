import { H5 } from '@blueprintjs/core'
import { ESides, ISpreadData } from './'

const SpreadRow = ({ spreadData }: { spreadData: ISpreadData }) => {
  return (
    <div style={{ justifyContent: 'space-between' }} className="flex-row spread-row">
      <div className="flex-column spread-row-user-order">User Order</div>
      <div className="flex-row spread-row-market">
        <div className="flex-column">
          <H5 style={{ color: `${spreadData.side === ESides.ask ? '#db3737' : '#4aa529'}` }}>
            {spreadData ? spreadData.last : 0}
          </H5>
          Last
        </div>
        <div className="flex-column" style={{ margin: '0 auto' }}>
          <H5>
            {spreadData ? spreadData.diff : 0} ({spreadData.pct ? spreadData.pct.toPrecision(2) : 0})%
          </H5>
          Spread
        </div>
      </div>
    </div>
  )
}

export default SpreadRow
