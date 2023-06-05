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

// src/routes/user.ts
var user_exports = {};
__export(user_exports, {
  userRoutes: () => userRoutes
});
module.exports = __toCommonJS(user_exports);
var import_zod = require("zod");

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/user.ts
async function userRoutes(app) {
  app.get("/user", async (request) => {
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
  app.get("/user/:id", async (request, reply) => {
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
  app.post("/user", async (request) => {
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
  app.put("/user/:id", async (request, reply) => {
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
  app.delete("/user/:id", async (request, reply) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  userRoutes
});
