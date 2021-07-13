import { useState, useMemo, useEffect } from 'react'
import { Dialog, Button, Classes, Menu, MenuItem, Intent } from '@blueprintjs/core'
import { Popover2 } from '@blueprintjs/popover2'
import { notify, EToastType } from '../components/shared/toasts'
import Wallet from '@project-serum/sol-wallet-adapter'
import {
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SolletExtensionAdapter,
  MathWalletAdapter,
} from '../wallet-adapters'
// import { useLocalStorageState } from './utils'
import { WalletAdapter } from '../wallet-adapters/types'
import { useRecoilValue } from 'recoil'
import { walletState, connectionState } from '../recoil/exchangeState'

const ASSET_URL = 'https://cdn.jsdelivr.net/gh/solana-labs/oyster@main/assets/wallets'
export const WALLET_PROVIDERS = [
  {
    name: 'sollet.io',
    url: 'https://www.sollet.io',
    icon: `${ASSET_URL}/sollet.svg`,
  },
  {
    name: 'Sollet Extension',
    url: 'https://www.sollet.io/extension',
    icon: `${ASSET_URL}/sollet.svg`,
    adapter: SolletExtensionAdapter as any,
  },
  {
    name: 'Ledger',
    url: 'https://www.ledger.com',
    icon: `${ASSET_URL}/ledger.svg`,
    adapter: LedgerWalletAdapter,
  },
  {
    name: 'Phantom',
    url: 'https://www.phantom.app',
    icon: `https://www.phantom.app/img/logo.png`,
    adapter: PhantomWalletAdapter,
  },
  {
    name: 'MathWallet',
    url: 'https://www.mathwallet.org',
    icon: `${ASSET_URL}/mathwallet.svg`,
    adapter: MathWalletAdapter,
  },
]

const WalletSelect = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const [autoConnect, setAutoConnect] = useState(false)
  const [localProviderUrl, setLocalProviderUrl] = useState('walletProvider')
  const stateWallet = useRecoilValue(walletState)
  const connectionConfig = useRecoilValue(connectionState)
  const [wallet, setWallet] = useState<WalletAdapter | undefined>(undefined)

  const providerUrl = stateWallet.providerUrl || localProviderUrl
  const provider = useMemo(() => WALLET_PROVIDERS.find(({ url }) => url === providerUrl), [providerUrl])

  useEffect(() => {
    if (provider) {
      const updateWallet = () => {
        // hack to also update wallet synchronously in case it disconnects
        // eslint-disable-next-line react-hooks/exhaustive-deps
        const newWallet = new (provider.adapter || Wallet)(providerUrl, connectionConfig.endpoint) as WalletAdapter
        console.log('wallet selected', newWallet)
        setWallet(newWallet)
      }

      if (document.readyState !== 'complete') {
        // wait to ensure that browser extensions are loaded
        const listener = () => {
          updateWallet()
          window.removeEventListener('load', listener)
        }
        window.addEventListener('load', listener)
        return () => window.removeEventListener('load', listener)
      } else {
        updateWallet()
      }
    }
  }, [provider, providerUrl, connectionConfig.endpoint])

  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (wallet) {
      wallet.on('connect', () => {
        if (wallet?.publicKey) {
          console.log('connected')
          localStorage.removeItem('feeDiscountKey')
          setConnected(true)
          const walletPublicKey = wallet.publicKey.toBase58()
          const keyToDisplay =
            walletPublicKey.length > 20
              ? `${walletPublicKey.substring(0, 7)}.....${walletPublicKey.substring(
                  walletPublicKey.length - 7,
                  walletPublicKey.length
                )}`
              : walletPublicKey

          notify({
            message: 'Wallet update',
            description: 'Connected to wallet ' + keyToDisplay,
            type: EToastType.SUCCESS,
          })
        }
      })

      wallet.on('disconnect', () => {
        setConnected(false)
        notify({
          message: 'Wallet update',
          description: 'Disconnected from wallet',
          type: EToastType.SUCCESS,
        })
        localStorage.removeItem('feeDiscountKey')
      })
    }

    return () => {
      setConnected(false)
      if (wallet && wallet.connected) {
        wallet.disconnect()
        setConnected(false)
      }
    }
  }, [wallet])

  useEffect(() => {
    if (wallet && autoConnect) {
      wallet.connect()
      setAutoConnect(false)
    }

    return () => {}
  }, [wallet, autoConnect])

  const onClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <div>
      {connected ? (
        <Popover2
          content={
            <Menu>
              <MenuItem text={'Sol: 234234'} />
              <MenuItem
                href={`https://explorer.solana.com/address/${wallet?.publicKey.toBase58()}`}
                text={'View Account on Beachs'}
              />
              <MenuItem onClick={() => setConnected(false)} text="Logout" icon="log-out" />
            </Menu>
          }
          placement="right-end"
        >
          <Button
            intent={Intent.PRIMARY}
            icon="user"
            text={wallet?.publicKey ? `${wallet?.publicKey.toBase58().slice(0, 8)}...` : 'Connecting...'}
          />
        </Popover2>
      ) : (
        <Button intent={Intent.PRIMARY} onClick={onClick} text="Login" rightIcon="log-in" />
      )}
      <Dialog
        className="bp3-dark"
        title={'Select Solana Wallet'}
        icon="send-to-graph"
        canOutsideClickClose={true}
        onClose={onClick}
        isOpen={isOpen}
      >
        <div className={Classes.DIALOG_BODY}>
          {WALLET_PROVIDERS.map((provider) => {
            const onClickWallet = function () {
              setLocalProviderUrl(provider.url)
              setAutoConnect(true)
              close()
            }

            return (
              <Button
                key={provider.name}
                large
                minimal
                onClick={onClickWallet}
                icon={
                  <img alt={`${provider.name}`} width={20} height={20} src={provider.icon} style={{ marginRight: 8 }} />
                }
                fill
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  marginBottom: 8,
                }}
              >
                {provider.name}
              </Button>
            )
          })}
        </div>
        <div className={Classes.DIALOG_FOOTER}>refresh page if wallets dont appear on selection</div>
      </Dialog>
    </div>
  )
}

export default WalletSelect
