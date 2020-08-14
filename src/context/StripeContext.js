import React, { useState, useEffect, useContext, createContext } from 'react'
import { UserContext } from './UserContext'
import { useLocation, useHistory } from 'react-router-dom'
import * as QueryString from 'query-string'
import { useMutation } from 'urql'
import { setupStripeMutation } from 'api'
import Loader from 'components/Loader'

const StripeContext = createContext()

const StripeProvider = ({ children }) => {
  const [processing, setProcessing] = useState(false)
  const { user } = useContext(UserContext)
  const { search, pathname } = useLocation()
  const { replace } = useHistory()

  const [, setupStripe] = useMutation(setupStripeMutation)

  const handle = async (stripeCode) => {
    setProcessing(true)
    await setupStripe({ stripeCode })
    setProcessing(false)

    window.location.replace('/?stripeSuccess=true')
    // replace(pathname)
  }

  useEffect(() => {
    const params = QueryString.parse(search)
    if (params.code) {
      console.log('handle')
      handle(params.code)
    }
  }, [search, replace, pathname])

  useEffect(() => {
    const params = QueryString.parse(search)
    if (params.stripeSuccess) {
      alert('Stripe succesfully connected. You can accept payments now')
    }
  }, [search, replace, pathname])

  return (
    <StripeContext.Provider
      value={{
        ok: true,
      }}
    >
      {processing && <Loader />}
      {children}
    </StripeContext.Provider>
  )
}

export { StripeProvider as default, StripeContext }
