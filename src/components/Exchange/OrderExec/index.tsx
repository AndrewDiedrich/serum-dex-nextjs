import { ButtonGroup, Button, Intent, ControlGroup, NumericInput } from '@blueprintjs/core'

const OrderExec = () => {
  return (
    <div>
      <ControlGroup vertical style={{ alignItems: 'center' }}>
        <ButtonGroup>
          <Button large intent={Intent.SUCCESS} text="Market Buy" />
          <Button large intent={Intent.DANGER} text="Market Sell" />
        </ButtonGroup>
        <NumericInput />
      </ControlGroup>
    </div>
  )
}

export default OrderExec
