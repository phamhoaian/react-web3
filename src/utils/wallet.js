import { CHAIN_INFO } from 'constants/chains'

export const addNetwork = async ({ provider, chainId }) => {
  if (!provider?.request) {
    return false
  }
  const info = CHAIN_INFO[chainId]

  await provider?.request({
    method: 'wallet_addEthereumChain',
    params: [info]
  })
  return true
}