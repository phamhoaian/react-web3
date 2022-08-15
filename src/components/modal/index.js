import React from 'react'
import CloseIcon from 'components/icons/close'
import { ModalCustom } from './style'

class BaseModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isShowModal: false,
      modalContent: null,
      config: {
        title: '',
        modalWidth: 400,
        closable: true,
        wrapClassName: '',
      },
    }
  }

  openModal = (
    modalContent,
    modalConfig
  ) => {
    this.setState({
      isShowModal: true,
      modalContent,
      config: { ...this.state.config, ...modalConfig },
    })
  }

  closeModal = () => {
    this.setState({
      isShowModal: false,
      modalContent: null,
    })
    const { customClose } = this.props
    customClose && customClose()
  }

  render() {
    const { isShowModal, modalContent, config } = this.state
    return (
      <ModalCustom
        wrapClassName={config.wrapClassName}
        width={config.modalWidth}
        title={config.title || null}
        footer={null}
        centered
        visible={isShowModal}
        onOk={null}
        onCancel={this.closeModal}
        closable={config.closable}
        maskClosable={config.closable}
        maskStyle={config.maskStyle}
        closeIcon={<CloseIcon />}
        afterClose={() => {
          config.onAfterClose && config.onAfterClose()
        }}
      >
        {modalContent && modalContent}
      </ModalCustom>
    )
  }
}

export default BaseModal
