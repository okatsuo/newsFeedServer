import 'reflect-metadata'
import { buildSchema } from 'type-graphql'
import { ApolloServer } from 'apollo-server'
import { UserResolver } from '../resolvers/user-resolver'

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async function main () {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  })
  const server = new ApolloServer({
    schema
  })
  const { url } = await server.listen(5544)
  console.log(`server running at ${url}`)
})()
