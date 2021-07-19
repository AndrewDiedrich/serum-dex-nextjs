import { Classes, HTMLSelect, Button, Menu, MenuItem } from '@blueprintjs/core'
import classNames from 'classnames'
import dropRight from 'lodash/dropRight'
import React, { useState } from 'react'
import RecentTrades from '../../RecentTrades'
import MarketInfo from '../../MarketInfo'
import { useRecoilState } from 'recoil'
import { themeState, THEMES } from '../../../../recoil/exchangeState'
import {
  Corner,
  createBalancedTreeFromLeaves,
  getLeaves,
  getNodeAtPath,
  getOtherDirection,
  getPathToCorner,
  Mosaic,
  MosaicDirection,
  MosaicNode,
  MosaicParent,
  MosaicWindow,
  MosaicZeroState,
  updateTree,
} from 'react-mosaic-component'
import OrderExec from '../../OrderExec'
// import { CloseAdditionalControlsButton } from './CloseAdditionalControlsButton'
import { Popover2 } from '@blueprintjs/popover2'

const Desktop = (): JSX.Element => {
  /**
   * Set Mosiac map up
   */
  const ViewMap = new Map()
  enum ViewId {
    RECENT_TRADES = 'Recent Trades',
    ORDERBOOK = 'Orderbook',
    ORDER_EXEC = 'Submit Orders',
    CHART = 'Chart',
    DEPTH_CHART = 'Depth Chart',
    ORDERS = 'Orders',
  }
  ViewMap.set(ViewId.CHART, 1)
  ViewMap.set(ViewId.ORDERS, 1)
  ViewMap.set(ViewId.ORDER_EXEC, 1)
  ViewMap.set(ViewId.RECENT_TRADES, 1)

  const [theme, setTheme] = useRecoilState(themeState)
  const [currentNode, setCurrentNode] = useState<MosaicNode<ViewId>>({
    direction: 'row',
    first: {
      direction: 'column',
      first: ViewId.CHART,
      second: ViewId.RECENT_TRADES,
    },
    second: {
      direction: 'column',
      first: ViewId.ORDER_EXEC,
      second: ViewId.ORDERS,
    },
    splitPercentage: 40,
  })

  const onChange = (currentNode: MosaicNode<ViewId>) => {
    console.log('onchange mf', currentNode)
    setCurrentNode(currentNode)
  }

  const onRelease = (currentNode: MosaicNode<ViewId> | null) => {
    console.log('Mosaic.onRelease():', currentNode)
  }

  // const WindowOptions = () => {
  //   return (
  //     <Popover2
  //       content={
  //         <Menu>
  //           {components.map((comp: string) => (
  //             <menuitem onClick={() => createNode(comp)} key={comp} title={comp} />
  //           ))}
  //         </Menu>
  //       }
  //     >
  //       <Button icon="add-location" />
  //     </Popover2>
  //   )
  // }

  const createNode = (id: string) => id

  const autoArrange = () => {
    const leaves = getLeaves(currentNode)

    setCurrentNode(createBalancedTreeFromLeaves(leaves))
  }
  const addToTopRight = (component: ViewId) => {
    let letCurrentNode = currentNode
    if (currentNode) {
      const path = getPathToCorner(letCurrentNode, Corner.TOP_RIGHT)
      const parent = getNodeAtPath(letCurrentNode, dropRight(path)) as MosaicParent<ViewId>
      const destination = getNodeAtPath(letCurrentNode, path) as MosaicNode<ViewId>
      const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : 'row'

      let first: MosaicNode<ViewId>
      let second: MosaicNode<ViewId>
      if (direction === 'row') {
        first = destination
        second = component
      } else {
        first = component
        second = destination
      }

      letCurrentNode = updateTree(letCurrentNode, [
        {
          path,
          spec: {
            $set: {
              direction,
              first,
              second,
            },
          },
        },
      ])
    } else {
      letCurrentNode = component
    }

    setCurrentNode({ letCurrentNode })
  }

  const renderNavBar = () => {
    return (
      <div className={classNames(Classes.NAVBAR, Classes.DARK)}>
        <div className={classNames(Classes.NAVBAR_GROUP, Classes.BUTTON_GROUP)}>
          <label className={classNames('theme-selection', Classes.LABEL, Classes.INLINE)}>
            Market:
            <MarketInfo />
          </label>
          <div className="navbar-separator" />
          <label className={classNames('theme-selection', Classes.LABEL, Classes.INLINE)}>
            Theme:
            <HTMLSelect value={theme} onChange={(e) => setTheme(e.currentTarget.value)}>
              {React.Children.toArray(Object.keys(THEMES).map((label) => <option key={label}>{label}</option>))}
            </HTMLSelect>
          </label>
          <div className="navbar-separator" />

          <Button icon="grid-view" onClick={autoArrange}>
            Auto Arrange
          </Button>
          <Button icon="arrow-top-right" onClick={addToTopRight}>
            Add Window to Top Right
          </Button>
        </div>
      </div>
    )
  }

  const componetSwitch = (id: ViewId) => {
    switch (id) {
      case ViewId.RECENT_TRADES:
        return <RecentTrades />
      case ViewId.ORDER_EXEC:
        return <OrderExec />
      default:
        break
    }
  }

  return (
    <div className="react-mosaic-example-app">
      <div>{renderNavBar()}</div>
      <Mosaic<ViewId>
        renderTile={(id, path) => {
          console.log(id, path)
          return (
            <MosaicWindow<ViewId>
              // additionalControls={id === 3 ? additionalControls : EMPTY_ARRAY}
              // toolbarControls={createNode()}
              title={`${id}`}
              createNode={() => createNode(id)}
              path={path}
              onDragStart={() => console.log('MosaicWindow.onDragStart')}
              onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
              // renderToolbar={() => <div className="toolbar-example">Custom Toolbar</div>}
            >
              <div className="example-window">{componetSwitch(id)}</div>
            </MosaicWindow>
          )
        }}
        zeroStateView={<MosaicZeroState createNode={createNode} />}
        value={currentNode}
        onChange={onChange}
        onRelease={onRelease}
        className={theme}
      />
    </div>
  )
}

export default Desktop
