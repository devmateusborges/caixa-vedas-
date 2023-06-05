import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function productRoutes(app: FastifyInstance) {
  // all
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
        cretedAt: product.createdAt,
      };
    });
  });
  // by id
  app.get("/product/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const data = await prisma.product.findUniqueOrThrow({
      where: {
        id,
      },
    });

    return data;
  });
  // add
  app.post("/product", async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      price: z.number(),
      icon: z.string(),
      amount: z.number(),
      describe: z.string(),
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
        describe,
      },
    });

    return newproduct;
  });

  // update
  app.put("/product/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    const bodySchema = z.object({
      name: z.string(),
      price: z.number(),
      icon: z.string(),
      amount: z.number(),
      describe: z.string(),
    });

    const { name, amount, price, describe, icon } = bodySchema.parse(
      request.body
    );

    const newProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        icon,
        name,
        amount,
        price,
        describe,
      },
    });

    return newProduct;
  });
  // delete
  app.delete("/product/:id", async (request, reply) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    });

    const { id } = paramsSchema.parse(request.params);

    await prisma.product.delete({
      where: {
        id,
      },
    });

    return reply.status(200).send();
  });
}
