/* eslint-disable @typescript-eslint/ban-ts-comment */
import Link from 'next/link'
import { Button, Menu, MenuItem, NavbarGroup, Navbar, H4, Alignment, NavbarHeading, Position } from '@blueprintjs/core'
import { Popover2 } from '@blueprintjs/popover2'
import WalletSelect from '../../utils/WalletSelect'

const Header = (): JSX.Element => {
  const exchangeMenu = (
    <Menu>
      <Link href="/exchange">
        <MenuItem text="Advanced" />
      </Link>
      <Link href="/exchange/simple">
        <MenuItem text="Simple" />
      </Link>
    </Menu>
  )
  return (
    <Navbar style={{ height: '60px', padding: '5px 10px 0 10px' }} className="panel bp3-dark">
      <NavbarGroup align={Alignment.LEFT}>
        <Link href={'/'}>
          <NavbarHeading>
            {/* <img style={{ height: '35px' }} src="/images/logo.svg" /> */}
            <H4>Spotlight by FC</H4>
          </NavbarHeading>
        </Link>
        <Popover2 content={exchangeMenu} position={Position.BOTTOM}>
          <Button rightIcon={'caret-down'} minimal>
            Trade
          </Button>
        </Popover2>
        <Link href="/statistics">
          <Button rightIcon="graph" minimal>
            Analyze
          </Button>
        </Link>
      </NavbarGroup>
      <NavbarGroup align={Alignment.RIGHT}>
        <WalletSelect />
      </NavbarGroup>
    </Navbar>
  )
}

export default Header
