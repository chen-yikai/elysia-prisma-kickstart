import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { prisma } from "../prisma/utils";

export default new Elysia()
  .use(
    swagger({
      path: "/swagger",
      provider: "swagger-ui",
      documentation: {
        info: {
          title: "Elysia & Prisma Kick start",
          description:
            "API for CRUD operations for postpres database via Prisma ORM & Elysia framework",
          version: "1.0.0",
        },
      },
      autoDarkMode: false,
    })
  )
  .get(
    "/item",
    async () => {
      return await prisma.items.findMany();
    },
    {
      detail: {
        tags: ["Item"],
      },
    }
  )
  .post(
    "/item",
    async ({ body }) => {
      await prisma.items.create({
        data: {
          title: body.title,
          info: body.info,
        },
      });
      return {
        message: "Item created successfully",
      };
    },
    {
      body: t.Object(
        {
          title: t.String(),
          info: t.String(),
        },
        {
          error: () => ({
            message: "Invalid request body",
          }),
        }
      ),
      response: {
        200: t.Object({
          message: t.String(),
        }),
      },
      detail: {
        tags: ["Item"],
      },
    }
  )
  .delete(
    "/item/:id",
    async ({ params }) => {
      const item = await prisma.items.delete({
        where: {
          id: params.id,
        },
      });
      return {
        message: "Item deleted successfully",
      };
    },
    {
      params: t.Object(
        {
          id: t.Integer(),
        },
        {
          error: () => ({
            message: "Invalid ID parameter",
          }),
        }
      ),
      response: {
        200: t.Object({
          message: t.String(),
        }),
      },
      detail: {
        tags: ["Item"],
      },
    }
  )
  .put(
    "/item/:id",
    async ({ params, body }) => {
      await prisma.items.update({
        where: {
          id: params.id,
        },
        data: {
          title: body.title,
          info: body.info,
        },
      });
      return {
        message: "Item updated successfully",
      };
    },
    {
      params: t.Object(
        {
          id: t.Integer(),
        },
        {
          error: () => ({
            message: "Invalid ID parameter",
          }),
        }
      ),
      body: t.Object(
        {
          title: t.String(),
          info: t.String(),
        },
        {
          error: () => ({
            message: "Invalid request body",
          }),
        }
      ),
      response: {
        200: t.Object({
          message: t.String(),
        }),
      },
      detail: {
        tags: ["Item"],
      },
    }
  )
  .listen(3000);

console.log("Server running at port 3000");
fetch("http://localhost:3000/item").then(async (res) => {
  console.log(await res.json());
});
