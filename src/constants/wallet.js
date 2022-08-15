import { injected, walletconnect, CONNECTOR_NAMES } from 'utils/web3React'
import images from 'configs/images'

export const CONNECTOR_LOCAL_STORAGE_KEY = 'connectorID'

export const SUPPORTED_WALLETS = {
  METAMASK: {
    connectorId: CONNECTOR_NAMES.Injected,
    connector: injected,
    name: 'MetaMask',
    icon: images.metamask,
    description: 'Connect to your MetaMask Wallet',
  },
  WALLETCONNECT: {
    connectorId: CONNECTOR_NAMES.WalletConnect,
    connector: walletconnect,
    name: 'WalletConnect',
    icon: images.walletConnect,
    description: 'Scan with WalletConnect to connect',
    mobile: true,
  },
}