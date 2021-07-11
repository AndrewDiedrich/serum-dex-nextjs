import { commaNum } from '../../../utils/numberFormaters'
import { IBookSide } from './'

const BookRow = (props: { index: number; row: IBookSide; side: string; widthPercent: number; color: string }) => {
  return (
    <tr
      key={`${props.row.size}-${props.side}-${props.index}`}
      style={{
        background: `linear-gradient(270deg, ${props.color} ${props.widthPercent}%, transparent ${
          1 - props.widthPercent
        }%)`,
      }}
      className={props.side === 'bids' ? 'blinkPositiveValue' : 'blinkNegativeValue mt-1 mb-1'}
    >
      <td className="orderbook-user-order">-</td>

      <td className={props.side === 'bids' ? 'orderbook-market-row-price-bids' : 'orderbook-market-row-price-asks'}>
        {commaNum(props.row.price)}
      </td>
      <td>{commaNum(props.row.size)}</td>
      <td>{commaNum(props.row.total)}</td>
    </tr>
  )
  // return (
  //   <div key={`${props.row.size}-${props.side}`} className="flex-row orderbook-row">
  //     <div className="flex-column orderbook-user-order">-</div>
  //     <div
  //       style={{
  //         background: `linear-gradient(270deg, ${props.color} ${props.widthPercent}%, transparent ${
  //           1 - props.widthPercent
  //         }%)`,
  //       }}
  //       className={
  //         props.side === 'bids'
  //           ? 'blinkPositiveValue flex-column orderbook-market-row'
  //           : 'blinkNegativeValue flex-column orderbook-market-row'
  //       }
  //     >
  //       <div className="flex-row orderbook-wrapped-row">
  //         <div className={`flex-column orderbook-market-row-price-${props.side}`}>{props.row.price}</div>
  //         <div className="flex-column orderbook-market-row-size">{props.row.size}</div>
  //         <div className="flex-column orderbook-market-row-total">{props.row.total}</div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default BookRow
