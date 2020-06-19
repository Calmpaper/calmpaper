import React, { useState, createContext } from 'react'
import Modal from 'pages/Login/Modal'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(null)
  const close = () => setShowModal(false)

  return (
    <ModalContext.Provider
      value={{
        showModal,
        setShowModal,
        close,
      }}
    >
      {showModal && <Modal />}
      {children}
    </ModalContext.Provider>
  )
}

export { ModalProvider as default, ModalContext }
