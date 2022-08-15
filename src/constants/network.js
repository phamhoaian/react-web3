import { SUPPORT_CHAIN_IDS, DEFAULT_CHAIN_ID } from 'constants/chains'

export const RPC_URLS = {
  [SUPPORT_CHAIN_IDS.POLYGON_MAINET]: 'https://speedy-nodes-nyc.moralis.io/bfd1b3bcaced5d452262798f/polygon/mainnet',
  [SUPPORT_CHAIN_IDS.POLYGON_TESTNET]: 'https://speedy-nodes-nyc.moralis.io/bfd1b3bcaced5d452262798f/polygon/mumbai',
}

export const DEFAULT_RPC_URL = RPC_URLS[DEFAULT_CHAIN_ID]