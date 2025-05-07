import * as path from 'path';
import * as fs from 'fs';
import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';

import { resolvers } from './resolvers'

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server is running on ${url}`)
  });