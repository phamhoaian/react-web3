import React, { useEffect, useRef } from 'react'

// hooks
import GlobalHooks from 'hooks/global'
import useAuth from 'hooks/useAuth'
import useActiveWeb3React from 'hooks/useActiveWeb3React'

// components
import { Row, Col, Button } from 'antd'
import BaseModal from 'components/modal'
import ConnectWallet from 'components/modal/connectWallet'

// stylesheet
import GlobalStyle from 'styles/global'
import 'antd/dist/antd.css'
import './index.css'

const App = () => {
  const baseModal = useRef()
  const { account, active } = useActiveWeb3React()
  const { logout } = useAuth()

  useEffect(() => {
    if (active) {
      baseModal.current.closeModal()
    }
  }, [active])

  const openModalConnectWallet = () => {
    baseModal.current.openModal(<ConnectWallet />, { title: 'Connect to wallet' })
  }

  return (
    <div className="App">
      <GlobalHooks />
      <GlobalStyle />
      <Row justify="middle" style={{ minHeight: '100vh' }}>
        <Col span={24} align="center">
          {active && account ? (
            <div>
              <p>Account: {account}</p>
              <Button type="danger" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Button type="primary" onClick={openModalConnectWallet}>
              Connect to wallet
            </Button>
          )}
        </Col>
      </Row>
      <BaseModal ref={baseModal} />
    </div>
  )
}

export default App
