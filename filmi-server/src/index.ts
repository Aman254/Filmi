import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use("/*", cors());

app.get("/", (c) => {
  console.log(c.env.DATABASE_URL);
  return c.text("Hello Hono!");
});

app.route("/api/v1/user", userRouter);
// app.route("/api/v1/movies", moviesRouter);

export default app;
