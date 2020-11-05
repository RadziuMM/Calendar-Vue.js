const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const { ApolloServer, gql } = require('apollo-server-express');
const { readFileSync } = require('fs');
const { prisma } = require('./src/src/generated/prisma-client');

const resolvers = {
  Query: {
    // eslint-disable-next-line no-return-await
    users: async () => await prisma.users(),
    user: async (parent, args) => prisma.user({ id: args.id }),
    userBYname: async (parent, args) => prisma.user({ name: args.name }),
  },
  Mutation: {
    createUser: async (parent, args) => {
      const user = {
        name: args.user.name,
        exist: true,
        password: args.user.password,
        data: '',
        Events: '',
      };
      return prisma.createUser(user);
    },
    deleteUser: async (parent, args) => prisma.deleteUser({ id: args.id }),
    updateUser: async (parent, {
      id, name, password, data, Events,
    }) => {
      const user = await prisma.user({ id });
      const userData = {
        name: name || user.name,
        password: password || user.password,
        data: data || user.data,
        Events: Events || user.Events,
      };

      return prisma.updateUser({
        data: userData,
        where: { id },
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs: gql`
    ${readFileSync(__dirname.concat('/src/schema.graphql'), 'utf8')}
  `,
  resolvers,
  engine: {
    reportSchema: false,
    variant: 'current',
  },
});

// server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
//   console.log(`🚀 Server ready at ${url}`);
// });

const app = express();
server.applyMiddleware({ app, path: '/graphql' });
app.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
console.log(port);
app.listen(port);
