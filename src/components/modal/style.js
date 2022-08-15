import styled from 'styled-components'
import { Modal } from 'antd'

export const ModalCustom = styled(Modal)`
  .ant-modal-content {
    border: 4px solid #8e47c8;
    border-radius: 30px;
  }
  .ant-modal-header {
    background-color: #8e47c8;
    border-color: #8e47c8;
    border-radius: 22px 22px 0 0;
    padding: 12px 15px;
  }
  .ant-modal-title {
    color: #FFF;
  }
  .ant-modal-close {
    top: 6px;
    right: 15px;
  }
  .ant-modal-close-x {
    width: 32px;
    height: 32px;
    line-height: 32px;
  }
`