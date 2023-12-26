import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import connectToDB from "./connectToDB.js";
import resolvers from "./schema.js";
import typeDefs from "./typeDefs.js";

const app = express();

const httpServer = http.createServer(app);

// Load environment variables
dotenv.config();

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,

  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

(async () => {
  try {
    await server.start();
    await connectToDB();
    app.use(
      "/graphql",

      expressMiddleware(server)
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
      console.log(`🚀 Server ready at ${4000}`);
    });
  } catch (error) {
    console.error("Error during startup:", error);
    process.exit(1);
  }
})();
