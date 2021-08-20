/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useRef, useEffect, useState } from 'react'
import { ControlGroup, NumericInput, Button, Intent, Spinner, Tag } from '@blueprintjs/core'
import { Order, Side } from '../index'

interface IHeader {
  text: string
  isSortable: boolean
  key: string
}

const OpenOrdersTable = ({ headers = [], data = [] }: { headers: Array<IHeader>; data: Array<Order> }) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrollHeight, setScrollHeight] = useState<number>(0)
  useEffect(() => {
    setScrollHeight(
      // @ts-ignore
      contentRef.current?.parentElement?.clientHeight - contentRef.current?.children[0].tHead.clientHeight
    )
  }, [contentRef.current?.parentElement?.clientHeight])

  const renderRows = () => {
    return data.map((row: Order, index: number) => {
      return (
        <tr
          key={`${row.symbol}-${index}`}
          className={(row.side === 'buy' ? 'order-row-bid' : 'order-row-ask').concat(' order-row')}
        >
          <td>{row.symbol}</td>
          <td>
            <Tag minimal intent={row.side === Side.BUY ? Intent.SUCCESS : Intent.DANGER}>
              {row.side}
            </Tag>
          </td>
          <td>
            <Tag minimal intent={Intent.PRIMARY}>
              {row.type}
            </Tag>
          </td>
          <td>{row.price}</td>
          <td>{row.type}</td>
          <td>
            <ControlGroup style={{ maxWidth: '250px' }}>
              <NumericInput
                style={{ height: '24px', borderRadius: '0' }}
                name="quantity"
                type="number"
                fill={true}
                buttonPosition="none"
                // onChange={this.handleFilterChange}
                placeholder="Amount"

                // value={'filterValue'}
              />
              <Button className="chnt-button">Set Price</Button>
            </ControlGroup>
          </td>
          <td>
            <Button
              className="chnt-button"
              style={{ height: '24px', maxWidth: '250px' }}
              intent={Intent.DANGER}
              icon="undo"
            ></Button>
          </td>
        </tr>
      )
    })
  }

  const renderHeaders = () => {
    return headers.map((header: IHeader) => {
      return <th key={`order-open-${header.key}`}>{header.text}</th>
    })
  }

  return (
    <div ref={contentRef}>
      <table className="bp3-html-table bp3-small bp3-interactive bp3-html-table-striped scroll">
        <thead>
          <tr>{renderHeaders()}</tr>
        </thead>
        <tbody
          style={{
            maxHeight: `${scrollHeight}px`,
          }}
        >
          {data.length > 0 ? renderRows() : <Spinner />}
        </tbody>
      </table>
    </div>
  )
}

export default OpenOrdersTable
