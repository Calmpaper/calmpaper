import React, { useState, useEffect, useMemo, useContext } from 'react'
import { UserContext } from 'context'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import Flex from 'components/Flex'
import TextareaAutosize from 'react-textarea-autosize'

const useOptions = () => {
  const options = useMemo(
    () => ({
      style: {
        base: {
          fontSize: 16,
          color: '#424770',
          letterSpacing: '0.025em',
          fontFamily: 'Inter, monospace',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#9e2146',
        },
      },
    }),
    [],
  )

  return options
}

const CardForm = ({
  newBookDonation,
  newChapterDonation,
  bookId,
  chapterId,
  amount,
  // message,
  author,
  onSuccess,
}) => {
  const [processing, setProcessing] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(null)
  const stripe = useStripe()

  const elements = useElements()
  const options = useOptions()
  const { user } = useContext(UserContext)

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    try {
      setProcessing(true)
      let res

      if (bookId) {
        res = await newBookDonation({
          amount: amount * 100, // convert float dollars amount to cents
          message,
          bookId,
        })
      }
      if (chapterId) {
        res = await newChapterDonation({
          amount: amount * 100, // convert float dollars amount to cents
          message,
          chapterId,
        })
      }

      console.log('----------res')
      console.log(res)

      let paymentRequestSecret
      if (chapterId) {
        paymentRequestSecret = res.data.newChapterDonation.paymentRequestSecret
      }
      if (bookId) {
        paymentRequestSecret = res.data.newBookDonation.paymentRequestSecret
      }

      console.log('paymentRequestSecret')
      console.log(paymentRequestSecret)
      console.log('stripe')
      console.log(stripe)

      const { paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: elements.getElement(CardElement),
      })

      // console.log('[PaymentMethod]', paymentMethod)

      stripe
        .confirmCardPayment(paymentRequestSecret, {
          // payment_method: {
          //   card: elements.getElement(CardElement),
          // },
          payment_method: paymentMethod.id,
          // payment_method_data: {
          //   billing_details: paymentMethod.billing_details,
          //   card: paymentMethod.card.id,
          // },
        })
        .then((payload) => {
          console.log('payload')
          console.log(payload)
          setProcessing(false)
          if (payload.error) {
            setError(payload.error)
            // logger.log('Booking failed.', payload.error)
            // this.setState({
            //   error: `Payment failed: ${payload.error.message}`,
            // })
          } else {
            onSuccess()
            // onBookingConfirmed && onBookingConfirmed(req.id)
          }
        })
    } catch (err) {
      //   logger.log('Booking failed.', err);
      //   this.setState({
      //     isProcessing: false,
      //   });
      //   this.setState({error: err.message});
      // }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextareaAutosize
        type="text"
        className="input textarea"
        placeholder="Leave a message (optional)"
        defaultValue={message}
        onChange={(e) => setMessage(e.target.value)}
        minRows={3}
        style={{ marginBottom: 12 }}
      />
      <label>
        <CardElement
          options={options}
          onReady={() => {
            console.log('CardElement [ready]')
          }}
          onChange={(event) => {
            console.log('CardElement [change]', event)
          }}
          onBlur={() => {
            console.log('CardElement [blur]')
          }}
          onFocus={() => {
            console.log('CardElement [focus]')
          }}
        />
      </label>
      <Flex row alignCenter justifyCenter style={{ marginTop: 24 }}>
        <button type="submit" disabled={!stripe} className="btn btn-color">
          {processing ? 'Processing...' : 'Pay'}
        </button>
      </Flex>
      {error && <span style={{ color: 'red' }}>{error}</span>}
    </form>
  )
}

export default CardForm
