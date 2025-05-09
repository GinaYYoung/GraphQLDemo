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

async function startServer() {
  try {
    const { url } = await server.listen();
    console.log(`Server is running on ${url}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();