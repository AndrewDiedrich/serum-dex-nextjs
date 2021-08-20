import { ControlGroup, Button } from '@blueprintjs/core'
import PriceChart from '../../shared/charts/PriceChart'

const Charts = () => {
  return (
    <>
      <ControlGroup>
        <Button disabled text="Trading View" />
        <Button text="Simple" />
      </ControlGroup>
      <PriceChart />
    </>
  )
}

export default Charts
