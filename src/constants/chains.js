export const SUPPORT_CHAIN_IDS = {
  POLYGON_MAINET: 137,
  POLYGON_TESTNET: 80001
}

export const CHAIN_INFO = {
  [SUPPORT_CHAIN_IDS.POLYGON_MAINET]: {
    chainId: '0x89', // 137
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://speedy-nodes-nyc.moralis.io/bfd1b3bcaced5d452262798f/polygon/mainnet'],
    blockExplorerUrls: ['https://polygonscan.com']
  },
  [SUPPORT_CHAIN_IDS.POLYGON_TESTNET]: {
    chainId: '0x13881', // 80001
    chainName: 'Mumbai Testnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://speedy-nodes-nyc.moralis.io/bfd1b3bcaced5d452262798f/polygon/mumbai'],
    blockExplorerUrls: ['https://mumbai.polygonscan.com']
  }
}

export const DEFAULT_CHAIN_ID = parseInt(process.env.REACT_APP_CHAIN_ID)