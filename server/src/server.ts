import "dotenv/config";

import fastify from "fastify";
import cors from "@fastify/cors";
import { userRoutes } from "./routes/user";
import { authRoutes } from "./routes/auth";
import multipart from "@fastify/multipart";
import jwt from "@fastify/jwt";

import { resolve } from "path";
import { productRoutes } from "./routes/product";
import { clientRoutes } from "./routes/client";
import { salesRoutes } from "./routes/sales";
import { dashboardRoutes } from "./routes/dashboard";

const app = fastify();

app.register(cors, {
  origin: true,
});

app.register(multipart);

// deixa pasta statica
app.register(require("@fastify/static"), {
  root: resolve(__dirname, "../uploads"),
  prefix: "/uploads",
});

// TODO para ultilizar  @fastify/jwt
app.register(jwt, {
  // TODO ALTERAR  secret: "spacetime"
  secret: "abcdefghijklmnopqrstuvwxyz123456789",
});

app.register(authRoutes);
app.register(userRoutes);
app.register(productRoutes);
app.register(clientRoutes);
app.register(salesRoutes);
app.register(dashboardRoutes);

app
  .listen({
    port: 3333,
    host: "0.0.0.0",
  })
  .then(() => {
    console.log("🚀 HTTP server running on port http://localhost:3333");
  });
