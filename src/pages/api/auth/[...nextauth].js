import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import { PrismaClient } from '@prisma/client'
const { sign } = require('jsonwebtoken')

const prisma = new PrismaClient()

const options = {
  secret: process.env.APP_SECRET,
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  session: { jwt: true },

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
      console.log('--------------------------------')
      console.log('Session is checked')
      console.log('Session:', session)
      console.log('User:', user)
      if (user) {
        session.user = user
      }

      return Promise.resolve(session)
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      console.log('--------------------------------')
      console.log('Jwt is checked')
      console.log(token)
      console.log('User:', user)
      console.log('Account:', account)
      console.log('Profile:', profile)

      const isSignIn = user ? true : false
      if (isSignIn) {
        token.userId = user.id
        token = { ...token, ...profile, ...user }
      }

      return Promise.resolve(token)
    },
  },
}

export default (req, res) => NextAuth(req, res, options)
