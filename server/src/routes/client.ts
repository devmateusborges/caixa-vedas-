import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function clientRoutes(app: FastifyInstance) {
  // all
  app.get("/client", async (request) => {
    const dataclients = await prisma.client.findMany();

    return dataclients.map((client) => {
      return {
        id: client.id,
        name: client.name,
        address: client.address,
        email: client.email,
        credits: client.credits,
        cretedAt: client.createdAt,
      };
    });
  });
  // by id
  app.get("/client/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const openaiToken = await prisma.client.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return openaiToken;
  });
  // add
  app.post("/client", async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      address: z.string(),
      email: z.string(),
      credits: z.number(),
    });

    const { name, address, email, credits } = bodySchema.parse(request.body);

    const newclient = await prisma.client.create({
      data: {
        name,
        address,
        email,
        credits,
      },
    });

    return newclient;
  });
  // update
  app.put("/client/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      name: z.string(),
      address: z.string(),
      email: z.string(),
      credits: z.number(),
    });

    const { name, address, email, credits } = bodySchema.parse(request.body);

    const Newclient = await prisma.client.update({
      where: {
        id,
      },
      data: {
        name,
        address,
        email,
        credits,
      },
    });

    return Newclient;
  });
  // delete
  app.delete("/client/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const client = await prisma.client.findUniqueOrThrow({
      where: {
        id,
      },
    });

    await prisma.client.delete({
      where: {
        id,
      },
    });

    return reply.status(200).send();
  });
}
