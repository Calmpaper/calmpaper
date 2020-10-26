import React, { useState } from 'react'
import StripeSetupModal from 'components/Stripe/PaymentSetupModal'
import Flex from 'components/atoms/flex'

export default () => {
  const [showStripeSetupModal, setShowStripeSetupModal] = useState(false)
  // const showDonationsAnnouncement = user && !user.stripeId
  const showDonationsAnnouncement = false

  return (
    <>
      {showStripeSetupModal && (
        <StripeSetupModal
          show={showStripeSetupModal}
          close={() => setShowStripeSetupModal(false)}
        />
      )}
      <Flex row alignCenter justifyBetween className="row announcement">
        <Flex row alignCenter>
          <div className="badge">
            <div className="badge-bg bg-primary-2-copy" />
            <div className="badge-text text-primary-2-copy">New!</div>
          </div>
          <div className="text-space-left w-dyn-list">
            <div role="list" className="w-dyn-items">
              <div role="listitem" className="w-dyn-item">
                <a
                  onClick={() => setShowStripeSetupModal(true)}
                  className="text-gray-1"
                  style={{
                    fontSize: 16,
                    opacity: 0.8,
                    cursor: 'pointer',
                  }}
                >
                  Collect donations
                </a>
              </div>
            </div>
          </div>
        </Flex>
        <button
          className="btn btn-color"
          onClick={() => setShowStripeSetupModal(true)}
          style={{ marginRight: 30, height: 32 }}
        >
          Start earning
        </button>
      </Flex>
    </>
  )
}
