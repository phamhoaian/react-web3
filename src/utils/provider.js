import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { DEFAULT_RPC_URL } from 'constants/network'

export const staticRpcProvider = new StaticJsonRpcProvider(DEFAULT_RPC_URL)