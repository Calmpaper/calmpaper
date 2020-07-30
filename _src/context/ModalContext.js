import React, { useState, createContext } from 'react'

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
      {children}
    </ModalContext.Provider>
  )
}

export { ModalProvider as default, ModalContext }
