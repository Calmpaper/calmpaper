import { PrismaClient } from '@prisma/client'
import getHost from 'utils/get-host'
const querystring = require('querystring')
import requireAuthEndpoint from 'utils/requireAuthEndpoint'

const prisma = new PrismaClient()

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId

  try {
    let userAccount = await prisma.user.findOne({
      where: { id: parseInt(authenticatedUserId) },
    })

    let clientId = process.env.STRIPE_CLIENT_ID

    // Pass UserAccount info along to Stripe
    let userEmail = userAccount.email
    let userFirstName = 'Maxim'
    let userLastName = 'Ignatev'
    // let userFirstName = userAccount.firstName;
    // let userLastName = userAccount.lastName;

    const redirect_uri = getHost(req) + '/stripe/callback'

    let stripeConnectParams = {
      response_type: 'code',
      redirect_uri: redirect_uri,
      client_id: clientId,
      scope: 'read_write',
      'stripe_user[email]': userEmail,
      'stripe_user[first_name]': userFirstName,
      'stripe_user[last_name]': userLastName,
      'stripe_user[business_type]': 'individual',
      'stripe_user[country]': 'US',
    }

    let reqQuery = querystring.stringify(stripeConnectParams)

    const location = `https://connect.stripe.com/express/oauth/authorize?${reqQuery}`

    return res.status(200).json({
      location: location,
    })
  } catch (err) {
    return res.status(400).json(err)
  }
})
