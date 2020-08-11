const { ApolloServer } = require('apollo-server-micro')
const { PrismaClient } = require('@prisma/client')
const { nexusPrismaPlugin } = require('nexus-prisma')
const { makeSchema } = require('@nexus/schema')
const { applyMiddleware } = require('graphql-middleware')
const path = require('path')

const {
  User,
  Book,
  Chapter,
  Tag,
  Genre,
  Comment,
  Review,
  Like,
} = require('./types')
const { Query, Mutation } = require('./resolvers')
// const { permissions } = require('./middlewares/permissions')
// const { notifications } = require('./middlewares/notifications')
require('dotenv').config()

const prisma = new PrismaClient()

export const schema = makeSchema({
  types: [
    Query,
    Mutation,
    User,
    Book,
    Chapter,
    Tag,
    Genre,
    Comment,
    Review,
    Like,
  ],
  plugins: [nexusPrismaPlugin()],
  experimentalCRUD: true,
  outputs: {
    schema: path.join(
      process.cwd(),
      'src',
      'pages',
      'api',
      'graphql',
      'schema.graphql',
    ),
    // typegen: path.join(
    //   process.cwd(),
    //   'pages',
    //   'api',
    //   'graphql',
    //   'nexus-typegen.ts',
    // ),
  },
})

// schema = applyMiddleware(schema, permissions, notifications)

export const config = {
  api: {
    bodyParser: false,
  },
}

const server = new ApolloServer({
  schema,
  context: (request) => {
    return {
      ...request,
      prisma,
    }
  },
})

export default server.createHandler({
  path: '/api/graphql',
})
