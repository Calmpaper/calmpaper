import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { PrismaClient } from '@prisma/client'
const { sign } = require('jsonwebtoken')

const APP_SECRET = 'appsecret321'

const prisma = new PrismaClient()

const options = {
  secret: APP_SECRET,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  // session: { jwt: true },

  // A database is optional, but required to persist accounts in a database
  adapter: Adapters.Prisma.Adapter({
    prisma,
    modelMapping: {
      User: 'user',
      Account: 'account',
      Session: 'session',
      VerificationRequest: 'verificationRequest',
    },
  }),

  callbacks: {
    session: async (session, user, sessionToken) => {
      console.log('Session is checked')
      console.log('Session:', session)
      console.log('User:', user)
      if (user) {
        session.user = user
      }

      return Promise.resolve(session)
    },
    signIn: async (user, account, profile) => {
      const token = sign({ userId: user.id }, APP_SECRET)
      cookie.set('token', token, { expires: 1 })

      console.log('signIn callback')
      console.log('token:', token)

      return Promise.resolve(true)
    },
    //   // console.log('Profile:', profile)
    //   // email: 'ignatif@gmail.com',
    //   // name: 'Максим Игнатьев',
    //   // given_name: 'Максим',
    //   // family_name: 'Игнатьев',
    //   // picture: 'https://lh3.googleusercontent.com/a-/AOh14GjXoe9UPPQuZqPbvIO6cDQa0CVsC1Ex6HODtsZzYA',
  },
}

export default (req, res) => NextAuth(req, res, options)
