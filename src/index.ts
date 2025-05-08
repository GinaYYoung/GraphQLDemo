import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { formatError } from './errors';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError,
  context: ({ req }) => ({
    req,
  }),
});

server
  .listen()
  .then(({ url }) => {
    console.log(`Server is running on ${url}`);
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });