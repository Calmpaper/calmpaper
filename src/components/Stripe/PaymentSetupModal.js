import React, { useContext } from 'react'
import { UserContext } from 'context'
import Modal from 'react-modal'
import Flex from 'components/Flex'
import querystring from 'querystring'

export default ({ show, close, chapter }) => {
  const { user } = useContext(UserContext)

  const handle = () => {
    let stripeConnectParams = {
      response_type: 'code',
      redirect_uri: `${process.env.REACT_APP_FRONTEND_URL}`,
      client_id: process.env.REACT_APP_STRIPE_CLIENT_ID,
      requested_capabilities: ['card_payments', 'transfers', 'legacy_payments'],
      // suggested_capabilities: ['transfers'],
      scope: 'read_write',
      'stripe_user[email]': user.email,
      'stripe_user[first_name]': user.firstname,
      'stripe_user[last_name]': user.givenname,
      'stripe_user[business_type]': 'individual',
      'stripe_user[country]': 'US',
    }
    let reqQuery = querystring.stringify(stripeConnectParams)
    const url = `https://connect.stripe.com/express/oauth/authorize?${reqQuery}`

    if (url) {
      window.location.href = url
    }
  }

  return (
    <Modal
      isOpen={show}
      onRequestClose={close}
      style={{
        content: {
          position: 'relative',
          top: 200,
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          margin: '0 auto',
          border: 0,
          maxWidth: 480,
          textAlign: 'center',
          paddingTop: '70px',
          paddingBottom: '45px',
          boxShadow: '0px 18px 36px rgba(0,0,0,0.15)',
          borderRadius: '16px',
          background: 'white',
        },
      }}
      className="donation-modal"
    >
      <div className="content">
        <div className="completed">
          <img src="https://kavholm.com/static/icon-bank.svg" width="50" />
          <h1
            style={{
              marginLeft: '-25px',
              marginRight: '-25px',
              width: '400px',
            }}
          >
            Start earning from your books!
          </h1>

          <br />
          <br />

          <Flex row alignCenter justifyCenter>
            <button
              className="btn btn-color"
              onClick={handle}
              style={{
                padding: '4px 12px',
                marginTop: '-30px',
                width: '160px',
                fontSize: '15px',
              }}
            >
              Set up payouts
            </button>
          </Flex>
          <span
            style={{
              fontSize: '12px',
              lineHeight: 1.5,
            }}
          >
            You'll be redirected to Stripe to complete the onboarding proces.
          </span>
        </div>
      </div>
      <style jsx>{`
        .donation-modal img {
          margin-bottom: 25px;
          height: 44px;
        }
        .donation-modal .content {
          width: 350px;
          margin: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .donation-modal h1 {
          font-size: 24px;
          line-height: 30px;
          font-weight: 600;
          color: #373737;
          margin: 0;
          text-align: center;
          margin-bottom: 16px;
          width: 100%;
        }
        .donation-modal p {
          color: #373737;
          font-size: 17px;
          line-height: 23px;
          margin: 0;
        }
        .donation-modal .info {
          margin-bottom: 40px;
        }
        .donation-modal button {
          margin-bottom: 25px;
        }
        .donation-modal .footer {
          font-size: 14px;
          line-height: 19px;
          opacity: 0.7;
        }

        .donation-modal .completed {
          width: 100%;
        }

        .donation-modal .card-info {
          margin-bottom: 20px;
          padding: 10px 10px;
          height: 44px;
          border-radius: 6px;
          box-shadow: 0px 0px 0px 1px rgb(224, 224, 224),
            0px 2px 4px 0px rgba(0, 0, 0, 0.07),
            0px 1px 1.5px 0px rgba(0, 0, 0, 0.05);
        }

        .donation-modal .tip-text {
          color: rgba(0, 0, 0, 0.5);
          font-size: 14px;
          font-weight: normal;
          letter-spacing: -0.15px;
          text-align: center;
          margin: 20px 0;
        }

        .donation-modal {
          z-index: 10000;
        }
        .ReactModalPortal {
          z-index: 10000;
        }
      `}</style>
    </Modal>
  )
}
