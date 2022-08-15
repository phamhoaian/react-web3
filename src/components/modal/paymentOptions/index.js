import React, { useState } from 'react'
import { Row, Col, Button, Input } from 'antd'
import { Wrapper } from './style'
import useLandSalesContract from 'hooks/useLandSalesContract'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { PAYMENT_METHOD } from 'constants/payment'
import { TX_STEP } from 'constants/transaction'
import { getButtonTransactionLabel } from 'utils/transaction'
import { showNotification } from 'utils/function'
import { getScanLink } from 'utils/scanExplorer'
import Swal from 'sweetalert2'

const PaymentOptions = () => {
  const { IS_CHECKING, IS_APPROVING, IS_BUYING, IS_OK } = TX_STEP
  const { active, account, chainId } = useActiveWeb3React()
  const [method, setMethod] = useState(null)
  const [txStep, setTxStep] = useState(IS_OK)
  const [input, setInput] = useState('')
  const {
    getLandPriceInWETH,
    enoughWETHBalance,
    approveWETH,
    buyLandInWETH,
    getLandPriceInStableCoin,
    enoughStableCoinBalance,
    approveStableCoin,
    buyLandInStableCoin,
    getLandPriceInGameToken,
    enoughGameTokenBalance,
    approveGameToken,
    buyLandInGameToken,
  } = useLandSalesContract()

  // The first param to this callback is "event" -> do not remove it
  const handleBuyUsingUSDC = async (event) => {
    setMethod(PAYMENT_METHOD.USDC)

    const geolocation = input.split(',')
    if (geolocation.length < 3) return
    const [longitude, latitude, city] = geolocation

    if (!active) {
      showNotification('It is not possible to buy without a connected wallet', 'Please connect to a wallet', 'warning')
      setTxStep(IS_OK)
      return
    }

    setTxStep(IS_CHECKING)
    const landPriceInStableCoin = await getLandPriceInStableCoin(city)
    const isEnoughBalance = await enoughStableCoinBalance(account, landPriceInStableCoin)
    if (!isEnoughBalance) {
      showNotification('You do not have enough USDC tokens', 'Please check your token balance', 'warning')
      setTxStep(IS_OK)
      return
    }

    setTxStep(IS_APPROVING)
    const approveTx = await approveStableCoin(account, landPriceInStableCoin)
    if (!approveTx) {
      showNotification('It is not possible to buy without approve', 'Please approve before buy', 'warning')
      setTxStep(IS_OK)
      return
    }

    setTxStep(IS_BUYING)
    const buyLandTx = await buyLandInStableCoin(city, longitude, latitude)
    if (buyLandTx) {
      Swal.fire({
        title: `Congrats! You have purchased this land in the city ${city}: ${longitude}, ${latitude}`,
        html: `<a href="${getScanLink(buyLandTx, chainId)}" target="_blank">Here</a> is the transaction`,
        icon: 'success',
      })
    } else {
      Swal.fire({
        title: `Opps! Your transaction is failed`,
        icon: 'error',
      })
    }
    setTxStep(IS_OK)
  }

  // The first param to this callback is "event" -> do not remove it
  const handleBuyUsingWETH = async (event) => {
    setMethod(PAYMENT_METHOD.WETH)

    const geolocation = input.split(',')
    if (geolocation.length < 3) return
    const [longitude, latitude, city] = geolocation

    if (!active) {
      showNotification('It is not possible to buy without a connected wallet', 'Please connect to a wallet', 'warning')
      setTxStep(IS_OK)
      return
    }

    setTxStep(IS_CHECKING)
    const landPriceInWETH = await getLandPriceInWETH(city)
    const isEnoughBalance = await enoughWETHBalance(account, landPriceInWETH)
    if (!isEnoughBalance) {
      showNotification('You do not have enough WETH tokens', 'Please check your token balance', 'warning')
      setTxStep(IS_OK)
      return
    }

    setTxStep(IS_APPROVING)
    const approveTx = await approveWETH(account, landPriceInWETH)
    if (!approveTx) {
      showNotification('It is not possible to buy without approve', 'Please approve before buy', 'warning')
      setTxStep(IS_OK)
      return
    }

    setTxStep(IS_BUYING)
    const buyLandTx = await buyLandInWETH(city, longitude, latitude)
    if (buyLandTx) {
      Swal.fire({
        title: `Congrats! You have purchased this land in the city ${city}: ${longitude}, ${latitude}`,
        html: `<a href="${getScanLink(buyLandTx, chainId)}" target="_blank">Here</a> is the transaction`,
        icon: 'success',
      })
    } else {
      Swal.fire({
        title: `Opps! Your transaction is failed`,
        icon: 'error',
      })
    }
    setTxStep(IS_OK)
  }

  // The first param to this callback is "event" -> do not remove it
  const handleBuyGameToken = async (event) => {
    setMethod(PAYMENT_METHOD.GAME_TOKEN)

    const geolocation = input.split(',')
    if (geolocation.length < 3) return
    const [longitude, latitude, city] = geolocation

    if (!active) {
      showNotification('It is not possible to buy without a connected wallet', 'Please connect to a wallet', 'warning')
      setTxStep(IS_OK)
      return
    }

    setTxStep(IS_CHECKING)
    const landPriceInGameToken = await getLandPriceInGameToken(city)
    const isEnoughBalance = await enoughGameTokenBalance(account, landPriceInGameToken)
    if (!isEnoughBalance) {
      showNotification('You do not have enough game tokens', 'Please check your token balance', 'warning')
      setTxStep(IS_OK)
      return
    }

    setTxStep(IS_APPROVING)
    const approveTx = await approveGameToken(account, landPriceInGameToken)
    if (!approveTx) {
      showNotification('It is not possible to buy without approve', 'Please approve before buy', 'warning')
      setTxStep(IS_OK)
      return
    }

    setTxStep(IS_BUYING)
    const buyLandTx = await buyLandInGameToken(city, longitude, latitude)
    if (buyLandTx) {
      Swal.fire({
        title: `Congrats! You have purchased this land in the city ${city}: ${longitude}, ${latitude}`,
        html: `<a href="${getScanLink(buyLandTx, chainId)}" target="_blank">Here</a> is the transaction`,
        icon: 'success',
      })
    } else {
      Swal.fire({
        title: `Opps! Your transaction is failed`,
        icon: 'error',
      })
    }
    setTxStep(IS_OK)
  }
  return (
    <Wrapper>
      <Row gutter={[20, 20]}>
        <Col span={24}>
          <Input value={input} onChange={(e) => setInput(e.target.value)} />
          <p>The geolocation of land, ex: 720000,190000,mumbai</p>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            ghost
            block
            loading={[IS_CHECKING, IS_BUYING, IS_APPROVING].includes(txStep) && method === PAYMENT_METHOD.USDC}
            disabled={[IS_CHECKING, IS_BUYING, IS_APPROVING].includes(txStep) && method === PAYMENT_METHOD.USDC}
            onClick={() => handleBuyUsingUSDC()}
          >
            {txStep !== TX_STEP.IS_OK && method === PAYMENT_METHOD.USDC
              ? getButtonTransactionLabel(txStep)
              : 'Buy using USDC'}
          </Button>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            block
            loading={[IS_CHECKING, IS_BUYING, IS_APPROVING].includes(txStep) && method === PAYMENT_METHOD.WETH}
            disabled={[IS_CHECKING, IS_BUYING, IS_APPROVING].includes(txStep) && method === PAYMENT_METHOD.WETH}
            onClick={() => handleBuyUsingWETH()}
          >
            {txStep !== TX_STEP.IS_OK && method === PAYMENT_METHOD.WETH
              ? getButtonTransactionLabel(txStep)
              : 'Buy using WETH'}
          </Button>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            danger
            block
            loading={[IS_CHECKING, IS_BUYING, IS_APPROVING].includes(txStep) && method === PAYMENT_METHOD.GAME_TOKEN}
            disabled={[IS_CHECKING, IS_BUYING, IS_APPROVING].includes(txStep) && method === PAYMENT_METHOD.GAME_TOKEN}
            onClick={() => handleBuyGameToken()}
          >
            {txStep !== TX_STEP.IS_OK && method === PAYMENT_METHOD.GAME_TOKEN
              ? getButtonTransactionLabel(txStep)
              : `Buy using ${process.env.REACT_APP_GAME_TOKEN_SYMBOL}`}
          </Button>
        </Col>
      </Row>
    </Wrapper>
  )
}

export default PaymentOptions
