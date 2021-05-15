import "reflect-metadata";
import { createConnection, getConnectionOptions } from "typeorm";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import { HelloWorldResolver } from "./resolvers/HelloWorldResolver";
import cors from 'cors';

(async () => {
  const app = express();

  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  await createConnection({ ...options, name: "default" });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver,UserResolver],
      validate: true
    }),
    context: ({ req, res }) => ({ req, res })
  });

  app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
  }))

  apolloServer.applyMiddleware({ app, cors: false});
  const port = process.env.PORT || 4000;
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/graphql`);
  });
})();