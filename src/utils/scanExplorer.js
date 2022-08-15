import { SUPPORT_CHAIN_IDS, CHAIN_INFO } from 'constants/chains'

export const getScanLink = (
  txHash,
  chainId = SUPPORT_CHAIN_IDS.POLYGON_MAINET,
  type = 'transaction', // 'transaction' | 'token' | 'address' | 'block' | 'countdown'
) => {
  const BASE_SCAN_URLS = CHAIN_INFO[chainId].blockExplorerUrls[0]
  switch (type) {
    case 'transaction': {
      return `${BASE_SCAN_URLS}/tx/${txHash}`
    }
    case 'token': {
      return `${BASE_SCAN_URLS}/token/${txHash}`
    }
    case 'block': {
      return `${BASE_SCAN_URLS}/block/${txHash}`
    }
    case 'countdown': {
      return `${BASE_SCAN_URLS}/block/countdown/${txHash}`
    }
    default: {
      return `${BASE_SCAN_URLS}/address/${txHash}`
    }
  }
}
