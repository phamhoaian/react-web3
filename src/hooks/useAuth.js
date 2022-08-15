import { useCallback } from 'react'
import { UnsupportedChainIdError } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { CONNECTOR_LOCAL_STORAGE_KEY } from 'constants/wallet'
import { DEFAULT_CHAIN_ID } from 'constants/chains'
import { connectorsByName, getErrorMessage } from 'utils/web3React'
import { showNotification } from 'utils/function'
import { addNetwork } from 'utils/wallet'

const useAuth = () => {
  const { activate, deactivate } = useActiveWeb3React()

  const login = useCallback(
    (connectorId) => {
      const connector = connectorsByName[connectorId]
      console.log('useAuth -> connector', connector)
      if (connector) {
        // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
        if (connector instanceof WalletConnectConnector) {
          connector.walletConnectProvider = undefined
        }

        activate(connector, undefined, true)
          .then(() => {
            window.localStorage.setItem(CONNECTOR_LOCAL_STORAGE_KEY, connectorId)
          })
          .catch(async (error) => {
            const provider = await connector.getProvider()
            window.localStorage.removeItem(CONNECTOR_LOCAL_STORAGE_KEY)
            const errorMessage = getErrorMessage(error)
            showNotification('An error occurred', errorMessage, 'error')

            if (connector instanceof WalletConnectConnector) {
              connector.walletConnectProvider.disconnect()
            }
            if (error instanceof UnsupportedChainIdError) {
              const hasSetup = await addNetwork({ provider, chainId: DEFAULT_CHAIN_ID })
              console.log('login -> hasSetup', hasSetup)
              if (hasSetup) {
                activate(connector)
              }
            }
          })
      }
    },
    [activate],
  )

  const logout = useCallback(() => {
    deactivate()
    window.localStorage.removeItem(CONNECTOR_LOCAL_STORAGE_KEY)
  }, [deactivate])

  return { login, logout }
}

export default useAuth
