"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/server.ts
var import_config = require("dotenv/config");
var import_fastify = __toESM(require("fastify"));
var import_cors = __toESM(require("@fastify/cors"));

// src/routes/user.ts
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/user.ts
async function userRoutes(app2) {
  app2.get("/user", async (request) => {
    const dataUsers = await prisma.user.findMany();
    return dataUsers.map((user) => {
      return {
        id: user.id,
        name: user.name,
        login: user.login,
        active: user.active,
        cretedAt: user.createdAt
      };
    });
  });
  app2.get("/user/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const openaiToken = await prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    });
    return openaiToken;
  });
  app2.post("/user", async (request) => {
    const bodySchema = import_zod.z.object({
      name: import_zod.z.string(),
      login: import_zod.z.string(),
      password: import_zod.z.string(),
      active: import_zod.z.boolean(),
      avatarUrl: import_zod.z.string()
    });
    const { name, login, password, avatarUrl, active } = bodySchema.parse(
      request.body
    );
    const newUser = await prisma.user.create({
      data: {
        name,
        login,
        password,
        avatarUrl,
        active
      }
    });
    return newUser;
  });
  app2.put("/user/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const bodySchema = import_zod.z.object({
      name: import_zod.z.string(),
      login: import_zod.z.string(),
      password: import_zod.z.string(),
      active: import_zod.z.boolean(),
      avatarUrl: import_zod.z.string()
    });
    const { name, login, password, avatarUrl, active } = bodySchema.parse(
      request.body
    );
    const NewUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        login,
        password,
        avatarUrl,
        active
      }
    });
    return NewUser;
  });
  app2.delete("/user/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id
      }
    });
    await prisma.user.delete({
      where: {
        id
      }
    });
    return reply.status(200).send();
  });
}

// src/server.ts
var import_multipart = __toESM(require("@fastify/multipart"));
var import_jwt = __toESM(require("@fastify/jwt"));
var import_path = require("path");

// src/routes/product.ts
var import_zod2 = require("zod");
async function productRoutes(app2) {
  app2.get("/product", async (request) => {
    const dataproducts = await prisma.product.findMany();
    return dataproducts.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: product.price,
        icon: product.icon,
        amount: product.amount,
        describe: product.describe,
        cretedAt: product.createdAt
      };
    });
  });
  app2.get("/product/:id", async (request, reply) => {
    const paramsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const data = await prisma.product.findUniqueOrThrow({
      where: {
        id
      }
    });
    return data;
  });
  app2.post("/product", async (request) => {
    const bodySchema = import_zod2.z.object({
      name: import_zod2.z.string(),
      price: import_zod2.z.number(),
      icon: import_zod2.z.string(),
      amount: import_zod2.z.number(),
      describe: import_zod2.z.string()
    });
    const { name, amount, price, describe, icon } = bodySchema.parse(
      request.body
    );
    const newproduct = await prisma.product.create({
      data: {
        name,
        amount,
        icon,
        price,
        describe
      }
    });
    return newproduct;
  });
  app2.put("/product/:id", async (request, reply) => {
    const paramsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const bodySchema = import_zod2.z.object({
      name: import_zod2.z.string(),
      price: import_zod2.z.number(),
      icon: import_zod2.z.string(),
      amount: import_zod2.z.number(),
      describe: import_zod2.z.string()
    });
    const { name, amount, price, describe, icon } = bodySchema.parse(
      request.body
    );
    const newProduct = await prisma.product.update({
      where: {
        id
      },
      data: {
        icon,
        name,
        amount,
        price,
        describe
      }
    });
    return newProduct;
  });
  app2.delete("/product/:id", async (request, reply) => {
    const paramsSchema = import_zod2.z.object({
      id: import_zod2.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    await prisma.product.delete({
      where: {
        id
      }
    });
    return reply.status(200).send();
  });
}

// src/routes/client.ts
var import_zod3 = require("zod");
async function clientRoutes(app2) {
  app2.get("/client", async (request) => {
    const dataclients = await prisma.client.findMany();
    return dataclients.map((client) => {
      return {
        id: client.id,
        name: client.name,
        address: client.address,
        email: client.email,
        credits: client.credits,
        cretedAt: client.createdAt
      };
    });
  });
  app2.get("/client/:id", async (request, reply) => {
    const paramsSchema = import_zod3.z.object({
      id: import_zod3.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const openaiToken = await prisma.client.findUniqueOrThrow({
      where: {
        id
      }
    });
    return openaiToken;
  });
  app2.post("/client", async (request) => {
    const bodySchema = import_zod3.z.object({
      name: import_zod3.z.string(),
      address: import_zod3.z.string(),
      email: import_zod3.z.string(),
      credits: import_zod3.z.number()
    });
    const { name, address, email, credits } = bodySchema.parse(request.body);
    const newclient = await prisma.client.create({
      data: {
        name,
        address,
        email,
        credits
      }
    });
    return newclient;
  });
  app2.put("/client/:id", async (request, reply) => {
    const paramsSchema = import_zod3.z.object({
      id: import_zod3.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const bodySchema = import_zod3.z.object({
      name: import_zod3.z.string(),
      address: import_zod3.z.string(),
      email: import_zod3.z.string(),
      credits: import_zod3.z.number()
    });
    const { name, address, email, credits } = bodySchema.parse(request.body);
    const Newclient = await prisma.client.update({
      where: {
        id
      },
      data: {
        name,
        address,
        email,
        credits
      }
    });
    return Newclient;
  });
  app2.delete("/client/:id", async (request, reply) => {
    const paramsSchema = import_zod3.z.object({
      id: import_zod3.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const client = await prisma.client.findUniqueOrThrow({
      where: {
        id
      }
    });
    await prisma.client.delete({
      where: {
        id
      }
    });
    return reply.status(200).send();
  });
}

// src/routes/sales.ts
var import_zod4 = require("zod");
async function salesRoutes(app2) {
  app2.get("/sales", async (request) => {
    const dataSales = await prisma.sales.findMany({
      include: {
        User: true,
        product: true
      }
    });
    return dataSales.map((sales) => {
      return {
        id: sales.id,
        totalPrice: sales.totalPrice,
        amount: sales.amount,
        cretedAt: sales.createdAt,
        product: sales.product,
        user: sales.User
      };
    });
  });
  app2.get("/sales/:id", async (request, reply) => {
    const paramsSchema = import_zod4.z.object({
      id: import_zod4.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const openaiToken = await prisma.sales.findUniqueOrThrow({
      where: {
        id
      },
      include: {
        product: true,
        User: true
      }
    });
    return openaiToken;
  });
  app2.post("/sales", async (request) => {
    const bodySchema = import_zod4.z.object({
      productId: import_zod4.z.string(),
      clientId: import_zod4.z.string(),
      amount: import_zod4.z.number(),
      totalPrice: import_zod4.z.number()
    });
    const { productId, clientId, amount, totalPrice } = bodySchema.parse(
      request.body
    );
    const newsales = await prisma.sales.create({
      data: {
        productId,
        clientId,
        amount,
        totalPrice
      }
    });
    return newsales;
  });
  app2.put("/sales/:id", async (request, reply) => {
    const paramsSchema = import_zod4.z.object({
      id: import_zod4.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const bodySchema = import_zod4.z.object({
      productId: import_zod4.z.string(),
      clientId: import_zod4.z.string(),
      amount: import_zod4.z.number(),
      totalPrice: import_zod4.z.number()
    });
    const { productId, clientId, amount, totalPrice } = bodySchema.parse(
      request.body
    );
    const Newsales = await prisma.sales.update({
      where: {
        id
      },
      data: {
        productId,
        clientId,
        amount,
        totalPrice
      }
    });
    return Newsales;
  });
  app2.delete("/sales/:id", async (request, reply) => {
    const paramsSchema = import_zod4.z.object({
      id: import_zod4.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const sales = await prisma.sales.findUniqueOrThrow({
      where: {
        id
      }
    });
    await prisma.sales.delete({
      where: {
        id
      }
    });
    return reply.status(200).send();
  });
}

// src/routes/dashboard.ts
async function dashboardRoutes(app2) {
  app2.get("/saleshistory", async (request) => {
    const dataSales = await prisma.sales.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        product: true,
        User: true
      }
    });
    return dataSales.map((sales) => {
      return {
        id: sales.id,
        totalPrice: sales.totalPrice,
        amount: sales.amount,
        cretedAt: sales.createdAt,
        product: sales.product,
        user: sales.User
      };
    });
  });
  app2.get("/salesHistory", async (request) => {
    const dataSales = await prisma.sales.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        product: true,
        User: true
      }
    });
    return dataSales.map((sales) => {
      return {
        id: sales.id,
        totalPrice: sales.totalPrice,
        amount: sales.amount,
        cretedAt: sales.createdAt,
        product: sales.product,
        user: sales.User
      };
    });
  });
}

// src/server.ts
var app = (0, import_fastify.default)();
app.register(import_cors.default, {
  origin: true
});
app.register(import_multipart.default);
app.register(require("@fastify/static"), {
  root: (0, import_path.resolve)(__dirname, "../uploads"),
  prefix: "/uploads"
});
app.register(import_jwt.default, {
  // TODO ALTERAR  secret: "spacetime"
  secret: "abcdefghijklmnopqrstuvwxyz123456789"
});
app.register(userRoutes);
app.register(productRoutes);
app.register(clientRoutes);
app.register(salesRoutes);
app.register(dashboardRoutes);
app.listen({
  port: 3333,
  host: "0.0.0.0"
}).then(() => {
  console.log("\u{1F680} HTTP server running on port http://localhost:3333");
});
