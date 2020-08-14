let userEmail = user.email
let userFirstName = user.firstname
let userLastName = user.givenname

let stripeConnectParams = {
  response_type: 'code',
  redirect_uri: `${process.env.REACT_APP_FRONTEND_URL}`,
  client_id: process.env.REACT_APP_STRIPE_CLIENT_ID,
  scope: 'read_write',
  'stripe_user[email]': userEmail,
  'stripe_user[first_name]': userFirstName,
  'stripe_user[last_name]': userLastName,
  'stripe_user[business_type]': 'individual',
  'stripe_user[country]': 'US',
}
