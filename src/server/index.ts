import 'reflect-metadata'
import 'dotenv/config'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { UserResolver } from '../resolvers/user-resolver'
import { appConfig } from '../shared/config'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async function main () {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  })
  const server = new ApolloServer({
    schema
  })
  const { url } = await server.listen(appConfig.serverPort)
  console.log(`server running at ${url}`)
})()
