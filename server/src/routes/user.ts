import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function userRoutes(app: FastifyInstance) {
  // all
  app.get("/user", async (request) => {
    const dataUsers = await prisma.user.findMany();

    return dataUsers.map((user) => {
      return {
        id: user.id,
        name: user.name,
        login: user.login,
        active: user.active,
        cretedAt: user.createdAt,
      };
    });
  });
  // by id
  app.get("/user/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const openaiToken = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return openaiToken;
  });
  // add
  app.post("/user", async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      login: z.string(),
      password: z.string(),
      active: z.boolean(),
      avatarUrl: z.string(),
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
        active,
      },
    });

    return newUser;
  });

  // update
  app.put("/user/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      name: z.string(),
      login: z.string(),
      password: z.string(),
      active: z.boolean(),
      avatarUrl: z.string(),
    });

    const { name, login, password, avatarUrl, active } = bodySchema.parse(
      request.body
    );

    const NewUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        login,
        password,
        avatarUrl,
        active,
      },
    });

    return NewUser;
  });
  // delete
  app.delete("/user/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id,
      },
    });

    await prisma.user.delete({
      where: {
        id,
      },
    });

    return reply.status(200).send();
  });
}
