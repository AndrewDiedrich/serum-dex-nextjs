import { Classes, HTMLSelect, Button } from '@blueprintjs/core'
import classNames from 'classnames'
import dropRight from 'lodash/dropRight'
import React, { useState } from 'react'
import RecentTrades from '../../RecentTrades'
import MarketInfo from '../../MarketInfo'

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

import { CloseAdditionalControlsButton } from './CloseAdditionalControlsButton'

let windowCount = 3

export const THEMES = {
  ['Blueprint']: 'mosaic-blueprint-theme',
  ['Blueprint Dark']: classNames('mosaic-blueprint-theme', Classes.DARK),
  ['None']: '',
}

export type Theme = keyof typeof THEMES

// const additionalControls = React.Children.toArray([<CloseAdditionalControlsButton key={1} />])
const additionalControls = React.Children.toArray([<CloseAdditionalControlsButton key={1} />])

const EMPTY_ARRAY: any[] = []

export interface ExampleAppState {
  currentNode: MosaicNode<number> | null
  currentTheme: Theme
}

const Desktop = (): JSX.Element => {
  const [theme, setTheme] = useState(THEMES['Blueprint Dark'])
  const [currentNode, setCurrentNode] = useState<MosaicNode<number> | null>({
    direction: 'row',
    first: 1,
    second: {
      direction: 'column',
      first: 2,
      second: 3,
    },
    splitPercentage: 40,
  })

  const onChange = (currentNode: MosaicNode<number> | null) => {
    setCurrentNode(currentNode)
  }

  const onRelease = (currentNode: MosaicNode<number> | null) => {
    console.log('Mosaic.onRelease():', currentNode)
  }

  const createNode = () => ++windowCount

  const autoArrange = () => {
    const leaves = getLeaves(currentNode)

    setCurrentNode(createBalancedTreeFromLeaves(leaves))
  }
  const addToTopRight = () => {
    let letCurrentNode = currentNode
    if (currentNode) {
      const path = getPathToCorner(letCurrentNode, Corner.TOP_RIGHT)
      const parent = getNodeAtPath(letCurrentNode, dropRight(path)) as MosaicParent<number>
      const destination = getNodeAtPath(letCurrentNode, path) as MosaicNode<number>
      const direction: MosaicDirection = parent ? getOtherDirection(parent.direction) : 'row'

      let first: MosaicNode<number>
      let second: MosaicNode<number>
      if (direction === 'row') {
        first = destination
        second = ++windowCount
      } else {
        first = ++windowCount
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
      letCurrentNode = ++windowCount
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
          <label className={classNames('theme-selection', Classes.LABEL, Classes.INLINE)}>
            Theme:
            <HTMLSelect value={theme} onChange={(e) => setTheme(e.currentTarget.value as Theme)}>
              {React.Children.toArray(Object.keys(THEMES).map((label) => <option key={label}>{label}</option>))}
            </HTMLSelect>
          </label>
          <div className="navbar-separator" />
          <span className="actions-label">Example Actions:</span>
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

  return (
    <div className="react-mosaic-example-app">
      <div>{renderNavBar()}</div>
      <Mosaic<number>
        renderTile={(count, path) => (
          <MosaicWindow<number>
            additionalControls={count === 3 ? additionalControls : EMPTY_ARRAY}
            title={`Window ${count}`}
            createNode={createNode}
            path={path}
            onDragStart={() => console.log('MosaicWindow.onDragStart')}
            onDragEnd={(type) => console.log('MosaicWindow.onDragEnd', type)}
            renderToolbar={count === 2 ? () => <div className="toolbar-example">Custom Toolbar</div> : null}
          >
            <div className="example-window">
              <h1>{`Window ${count}`}</h1>
              <RecentTrades />
            </div>
          </MosaicWindow>
        )}
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
