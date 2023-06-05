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

// src/routes/sales.ts
var sales_exports = {};
__export(sales_exports, {
  salesRoutes: () => salesRoutes
});
module.exports = __toCommonJS(sales_exports);
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/sales.ts
async function salesRoutes(app) {
  app.get("/sales", async (request) => {
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
  app.get("/sales/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
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
  app.post("/sales", async (request) => {
    const bodySchema = import_zod.z.object({
      productId: import_zod.z.string(),
      clientId: import_zod.z.string(),
      amount: import_zod.z.number(),
      totalPrice: import_zod.z.number()
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
  app.put("/sales/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const bodySchema = import_zod.z.object({
      productId: import_zod.z.string(),
      clientId: import_zod.z.string(),
      amount: import_zod.z.number(),
      totalPrice: import_zod.z.number()
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
  app.delete("/sales/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  salesRoutes
});
