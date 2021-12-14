import 'reflect-metadata'
import 'dotenv/config'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { UserResolver } from '../resolvers/user-resolver'
import { appConfig } from '../shared/config'
import { authChecker } from '../shared/middleware'
import { PostResolver } from '../resolvers/post-resolver'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async function main () {
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
  const { url } = await server.listen(appConfig.serverPort)
  console.log(`server running at ${url}`)
})()
