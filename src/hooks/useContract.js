import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'
import { staticRpcProvider } from 'utils/provider'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

const getContractInstance = (address, abi, signer = null) => {
  const signerOrProvider = signer ?? staticRpcProvider
  return new Contract(address, abi, signerOrProvider)
}

const useContract = (address, contractABI) => {
  const { library } = useActiveWeb3React()
  return useMemo(() => {
    if (!address || !contractABI || !library) return null
    try {
      return getContractInstance(address, contractABI, library.getSigner())
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, contractABI, library])
}

export default useContract
