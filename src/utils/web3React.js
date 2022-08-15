import { Web3Provider } from '@ethersproject/providers'
import { UnsupportedChainIdError } from '@web3-react/core'
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  WalletConnectConnector,
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
} from '@web3-react/walletconnect-connector'
import { SUPPORT_CHAIN_IDS } from 'constants/chains'
import { RPC_URLS } from 'constants/network'

const POLLING_INTERVAL = 12000

export const ALL_SUPPORTED_CHAIN_IDS = [SUPPORT_CHAIN_IDS.POLYGON_MAINET, SUPPORT_CHAIN_IDS.POLYGON_TESTNET]

export const injected = new InjectedConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
})

export const walletconnect = new WalletConnectConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  rpc: RPC_URLS,
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
})

export const CONNECTOR_NAMES = {
  Injected: 'injected',
  WalletConnect: 'walletconnect'
}

export const getConnectorId = (connector) => {
  switch (true) {
    case connector instanceof InjectedConnector:
      return CONNECTOR_NAMES.Injected
    case connector instanceof WalletConnectConnector:
      return CONNECTOR_NAMES.WalletConnect
    default:
      return null
  }
}

export const connectorsByName = {
  [CONNECTOR_NAMES.Injected]: injected,
  [CONNECTOR_NAMES.WalletConnect]: walletconnect
}

export const getLibrary = (provider) => {
  const library = new Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

export const getErrorMessage = (error) => {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.'
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network."
  } else if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorWalletConnect
  ) {
    return 'Please authorize this website to access your Ethereum account.'
  } else {
    console.error(error)
    return 'An unknown error occurred. Check the console for more details.'
  }
}
