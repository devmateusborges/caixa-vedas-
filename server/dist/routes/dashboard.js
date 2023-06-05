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

// src/routes/dashboard.ts
var dashboard_exports = {};
__export(dashboard_exports, {
  dashboardRoutes: () => dashboardRoutes
});
module.exports = __toCommonJS(dashboard_exports);

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: ["query"]
});

// src/routes/dashboard.ts
async function dashboardRoutes(app) {
  app.get("/saleshistory", async (request) => {
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
  app.get("/salesHistory", async (request) => {
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dashboardRoutes
});
