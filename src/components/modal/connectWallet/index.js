import React from 'react'
import useAuth from 'hooks/useAuth'
import { SUPPORTED_WALLETS } from 'constants/wallet'
import { isMobile } from 'react-device-detect'
import { Wrapper, ConnectItem, ConnectItemLogo, ConnectItemName, ConnectItemDesc } from './style'

const Option = ({ index, name, description, icon, onClick = () => {} }) => {
  return (
    <ConnectItem key={index} onClick={onClick}>
      {icon && <ConnectItemLogo src={icon} />}
      <ConnectItemName>{name}</ConnectItemName>
      <ConnectItemDesc>{description}</ConnectItemDesc>
    </ConnectItem>
  )
}

const ConnectWallet = () => {
  const { login } = useAuth()
  const getOptions = () => {
    return Object.keys(SUPPORTED_WALLETS).map((key) => {
      const option = SUPPORTED_WALLETS[key]
      if (isMobile) {
        if (!window.web3 && !window.ethereum && option.mobile) {
          return (
            <Option
              index={key}
              name={option.name}
              description={option.description}
              icon={option.icon}
              onClick={() => login(option.connectorId)}
            />
          )
        } else {
          return null
        }
      }
      return (
        <Option
          key={key}
          name={option.name}
          description={option.description}
          icon={option.icon}
          onClick={() => login(option.connectorId)}
        />
      )
    })
  }
  return <Wrapper>{getOptions()}</Wrapper>
}

export default ConnectWallet
