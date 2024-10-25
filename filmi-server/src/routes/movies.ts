import { Hono } from "hono";

export const moviesRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

moviesRouter.post("/", async (c) => {
  const body = await c.req.json();
});
