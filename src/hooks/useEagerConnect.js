import { useEffect } from 'react'
import { CONNECTOR_LOCAL_STORAGE_KEY } from 'constants/wallet'
import useAuth from 'hooks/useAuth'

const useEagerConnect = () => {
  const { login } = useAuth()

  useEffect(() => {
    const connectorId = window.localStorage.getItem(CONNECTOR_LOCAL_STORAGE_KEY)
    if (connectorId) {
      login(connectorId)
    }
  }, [login])
}

export default useEagerConnect