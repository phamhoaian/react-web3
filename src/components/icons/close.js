import React from 'react'
import styled from 'styled-components'

const CloseWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  &:before, &:after {
    position: absolute;
    left: 15px;
    content: ' ';
    height: 33px;
    width: 2px;
    background-color: #FFFFFF;
  }
  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
`

const CloseIcon = () => {
  return <CloseWrapper />
}

export default CloseIcon