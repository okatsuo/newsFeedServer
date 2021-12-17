import 'reflect-metadata'
import 'dotenv/config'
import { buildSchema } from 'type-graphql'
import { UserResolver } from '../resolvers/user-resolver'
import { appConfig } from '../shared/config'
import { authChecker } from '../shared/middleware'
import { PostResolver } from '../resolvers/post-resolver'
import { graphqlUploadExpress } from 'graphql-upload'
import { ApolloServer } from 'apollo-server-express'
import express from 'express'

void (async function main () {
  const schema = await buildSchema({
    resolvers: [UserResolver, PostResolver],
    authChecker
  })

  const server = new ApolloServer({
    schema,
    context: ({ req }) => {
      const context = {
        authorization: req.headers.authorization
      }
      return context
    }
  })

  await server.start()
  const app = express()
  app.use(graphqlUploadExpress())
  server.applyMiddleware({ app })

  const { serverPort } = appConfig
  app.listen({ port: serverPort })

  console.log(`Server ready at http://localhost:${serverPort}${server.graphqlPath}`)
})()
