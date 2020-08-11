import { PrismaClient } from '@prisma/client'
import shortid from 'shortid'
import storage from 'helpers/storage'
import stripe from 'helpers/stripe'
import logger from 'helpers/logger'
import API from 'helpers/api'
import requireAuthEndpoint from 'utils/requireAuthEndpoint'

const prisma = new PrismaClient()

export default requireAuthEndpoint(async (req, res) => {
  let authenticatedUserId = req.authToken.userId

  try {
    let { chapterId, bookId, amount, currency = 'usd' } = req.body

    // Step 1: Get chapter details
    const chapter = await prisma.chapter.findOne({
      where: {
        id: parseInt(chapterId),
      },
    })

    // Step 2: Resolve authors Stripe account id
    const author = await prisma.user.findOne({
      where: {
        id: parseInt(chapter.authorId),
      },
    })

    if (!author.stripeUserId) {
      throw new Error('No stripe account found for author')
      return
    }

    // Step 3: Make destination payment on Stripe where funds are taken from card and transferred to the host's Stripe account.

    let payParams = {
      payment_method_types: ['card'],
      amount: amount,
      currency: currency,
      transfer_data: {
        destination: author.stripeUserId,
        amount: amount - Math.ceil(amount * 0.1),
      },
    }

    const paymentIntent = await stripe.paymentIntents.create(payParams)

    // Step 4: Create new transaction

    const transaction = await prisma.transaction.create({
      data: {
        chapterId: parseInt(chapterId),
        payingUser: authenticatedUserId,
        totalAmount: parseInt(amount),
        currency: currency,
        paymentId: paymentIntent.id,
      },
    })

    let response = {
      ...transaction,
      paymentRequestSecret: paymentIntent.client_secret,
    }

    return res.status(200).json(response)
  } catch (err) {
    console.log('err', err)
    return res.status(500).json({
      status: 'error',
      message: err.message,
    })
  }
})
