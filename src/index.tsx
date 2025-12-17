import { Elysia, t } from "elysia";
import { html, Html } from "@elysiajs/html";

new Elysia()
  .use(html())
  .listen(3000);

console.log("Server running at port 3000");
fetch("http://localhost:3000/item").then(async (res) => {
  console.log(await res.json());
});
