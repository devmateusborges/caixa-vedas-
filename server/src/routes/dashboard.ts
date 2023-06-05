import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function dashboardRoutes(app: FastifyInstance) {
  // all
  app.get("/saleshistory", async (request) => {
    const dataSales = await prisma.sales.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        product: true,
        User: true,
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
  app.get("/salesHistory", async (request) => {
    const dataSales = await prisma.sales.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        product: true,
        User: true,
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
}
