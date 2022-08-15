import styled from 'styled-components'

export const Wrapper = styled.div``

export const ConnectItem = styled.div`
  text-align: center;
  cursor: pointer;
  padding: 24px;
  border-top: 1px solid rgba(195, 195, 195, 0.14);
  &:first-child {
    border-top: none;
  }
`

export const ConnectItemLogo = styled.img`
  width: 45px;
  height: 45px;
`

export const ConnectItemName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  margin-top: 0.5em;
  margin-bottom: 0;
  color: rgb(12, 12, 13);
`

export const ConnectItemDesc = styled.p`
  font-size: 18px;
  margin: 0.333em 0px;
  color: rgb(169, 169, 188);
`
