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

// src/routes/client.ts
var client_exports = {};
__export(client_exports, {
  clientRoutes: () => clientRoutes
});
module.exports = __toCommonJS(client_exports);
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/client.ts
async function clientRoutes(app) {
  app.get("/client", async (request) => {
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
  app.get("/client/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const openaiToken = await prisma.client.findUniqueOrThrow({
      where: {
        id
      }
    });
    return openaiToken;
  });
  app.post("/client", async (request) => {
    const bodySchema = import_zod.z.object({
      name: import_zod.z.string(),
      address: import_zod.z.string(),
      email: import_zod.z.string(),
      credits: import_zod.z.number()
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
  app.put("/client/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
    });
    const { id } = paramsSchema.parse(request.params);
    const bodySchema = import_zod.z.object({
      name: import_zod.z.string(),
      address: import_zod.z.string(),
      email: import_zod.z.string(),
      credits: import_zod.z.number()
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
  app.delete("/client/:id", async (request, reply) => {
    const paramsSchema = import_zod.z.object({
      id: import_zod.z.string().uuid()
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clientRoutes
});
