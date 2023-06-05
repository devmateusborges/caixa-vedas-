"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/product.ts
var product_exports = {};
__export(product_exports, {
  productRoutes: () => productRoutes
});
module.exports = __toCommonJS(product_exports);
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/product.ts
async function productRoutes(app) {
  app.get("/product", async (request) => {
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
  app.get("/product/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const data = await prisma.product.findUniqueOrThrow({
      where: {
        id
      }
    });
    return data;
  });
  app.post("/product", async (request) => {
    const bodySchema = import_zod.z.object({
      name: import_zod.z.string(),
      price: import_zod.z.number(),
      icon: import_zod.z.string(),
      amount: import_zod.z.number(),
      describe: import_zod.z.string()
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
  app.put("/product/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const bodySchema = import_zod.z.object({
      name: import_zod.z.string(),
      price: import_zod.z.number(),
      icon: import_zod.z.string(),
      amount: import_zod.z.number(),
      describe: import_zod.z.string()
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
  app.delete("/product/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  productRoutes
});
