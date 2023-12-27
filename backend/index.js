import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import connectToDB from "./connectToDB.js";
import resolvers from "./schema.js";
import typeDefs from "./typeDefs.js";

// Load environment variables
dotenv.config();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
});
async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());
  await server.start();
  await connectToDB();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => {
        const authorization = req.headers.authorization || "";

        if (authorization) {
          try {
            const user = jwt.verify(authorization, process.env.JWT_SECRET);
            return {
              user,
            };
          } catch (error) {
            console.error("Token verification error:", error);
            return {};
          }
        }
      },
    })
  );
  app.get("/", async (req, res, next) => {
    res.send("hello");
  });
  // Global error handler middleware
  app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err);
    res.status(500).json({ error: "Internal Server Error" });
  });

  app.listen({ port: 4000 }, () => {
    // console.log(`🚀 Server ready at ${4000}`);
    console.log(
      `🚀 Graphql server ready at ${`http://localhost:4000/graphql`}`
    );
  });
}
startServer();
