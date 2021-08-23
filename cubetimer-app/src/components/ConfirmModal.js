import React from 'react'
import { Modal } from 'antd'

const ConfirmModal = (props) => {
  return (
    <>
      <Modal title={props.title} visible={props.visible} onOk={props.onConfirm} onCancel={props.handleCancel}>
      	<p>{props.description}</p>
      </Modal>
    </>
  )
}

export default ConfirmModal