import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { Product, Sales } from "@prisma/client";

export async function salesRoutes(app: FastifyInstance) {
  // all
  app.get("/sales", async (request) => {
    const dataSales = await prisma.sales.findMany({
      include: {
        User: true,
        product: true,
      },
    });
    return dataSales.map((sales) => {
      return {
        id: sales.id,
        totalPrice: sales.totalPrice,
        amount: sales.amount,
        cretedAt: sales.createdAt,
        product: sales.product,
        user: sales.User,
      };
    });
  });

  // by id
  app.get("/sales/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const openaiToken = await prisma.sales.findUniqueOrThrow({
      where: {
        id,
      },
      include: {
        product: true,
        User: true,
      },
    });

    return openaiToken;
  });
  // add
  app.post("/sales", async (request) => {
    const bodySchema = z.object({
      productId: z.string(),
      clientId: z.string(),
      amount: z.number(),
      totalPrice: z.number(),
    });

    const { productId, clientId, amount, totalPrice } = bodySchema.parse(
      request.body
    );

    const newsales = await prisma.sales.create({
      data: {
        productId,
        clientId,
        amount,
        totalPrice,
      },
    });

    return newsales;
  });
  // update
  app.put("/sales/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      productId: z.string(),
      clientId: z.string(),
      amount: z.number(),
      totalPrice: z.number(),
    });

    const { productId, clientId, amount, totalPrice } = bodySchema.parse(
      request.body
    );

    const Newsales = await prisma.sales.update({
      where: {
        id,
      },
      data: {
        productId,
        clientId,
        amount,
        totalPrice,
      },
    });

    return Newsales;
  });
  // delete
  app.delete("/sales/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const sales = await prisma.sales.findUniqueOrThrow({
      where: {
        id,
      },
    });

    await prisma.sales.delete({
      where: {
        id,
      },
    });

    return reply.status(200).send();
  });
}
