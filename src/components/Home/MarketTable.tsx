import { HTMLTable } from '@blueprintjs/core'

const MarketTable = (): JSX.Element => {
  return (
    <div>
      <HTMLTable>
        <th>
          <td>Ticker</td>
        </th>
        <tbody>
          <tr>
            <td>SOL/USD</td>
          </tr>
        </tbody>
      </HTMLTable>
    </div>
  )
}

export default MarketTable
