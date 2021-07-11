import { HTMLTable } from '@blueprintjs/core'
import { useMarkPrice } from '../../utils/markets'

const Markets = () => {
  const price = useMarkPrice()
  console.log('price', price)
  return <HTMLTable>{price}</HTMLTable>
}

export default Markets
