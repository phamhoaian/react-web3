import { useEffect, useState, useRef } from 'react'
import { useWeb3React } from '@web3-react/core'
import { staticRpcProvider } from 'utils/provider'
import { DEFAULT_CHAIN_ID } from 'constants/chains'

/**
 * Provides a web3 provider with or without user's signer
 * Recreate web3 instance only if the provider change
 */
const useActiveWeb3React = () => {
  const { library, chainId, ...web3React } = useWeb3React()
  const refLib = useRef(library)
  const [provider, setProvider] = useState(library || staticRpcProvider)

  useEffect(() => {
    if (library !== refLib.current) {
      setProvider(library || staticRpcProvider)
      refLib.current = library
    }
  }, [library])

  return { library: provider, chainId: chainId ?? DEFAULT_CHAIN_ID, ...web3React }
}

export default useActiveWeb3React