import React from 'react'
import './Modal.css'

interface Props {
  onClose: () => void
  children: React.ReactNode
}

const Modal = (props: Props) => (
  <div className="modal" onClick={props.onClose}>
    <div className="modal-content">
      {props.children}
      <div style={{ textAlign: 'center' }}>
        <button onClick={props.onClose}>close</button>
      </div>
    </div>
  </div>
)

export default Modal
