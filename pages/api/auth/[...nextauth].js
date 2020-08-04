// import NextAuth from 'next-auth'
// import Providers from 'next-auth/providers'
// import Adapters from 'next-auth/adapters'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

// const options = {
//   providers: [
//     // Providers.Email({
//     //   server: process.env.EMAIL_SERVER,
//     //   from: process.env.EMAIL_FROM,
//     // }),
//     // Providers.Apple({
//     //   clientId: process.env.APPLE_ID,
//     //   clientSecret: {
//     //     appleId: process.env.APPLE_ID,
//     //     teamId: process.env.APPLE_TEAM_ID,
//     //     privateKey: process.env.APPLE_PRIVATE_KEY,
//     //     keyId: process.env.APPLE_KEY_ID,
//     //   }
//     // }),
//     // Providers.Facebook({
//     //   clientId: process.env.FACEBOOK_ID,
//     //   clientSecret: process.env.FACEBOOK_SECRET
//     // }),
//     Providers.Google({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     // Providers.Twitter({
//     //   clientId: process.env.TWITTER_ID,
//     //   clientSecret: process.env.TWITTER_SECRET
//     // }),
//   ],

//   // A database is optional, but required to persist accounts in a database
//   adapter: Adapters.Prisma.Adapter({ prisma }),
// }

// export default (req, res) => NextAuth(req, res, options)
