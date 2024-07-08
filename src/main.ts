import { staticPlugin } from "@elysiajs/static";
// import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { config } from "./config";
import { ctx } from "./context";
import {authController} from './controllers/auth.tsx';
// import {chatController} from './controllers/chat.tsx';
// import {organizationsController} from './controllers/organization.tsx';
// import {ticketController} from './controllers/ticket.tsx';
import { login } from "./pages/(auth)/login.tsx";
import { dashboard } from "./pages/dashboard.tsx";

console.log(authController,'api')

const app = new Elysia()
  // .use(swagger())
  // @ts-expect-error
  .use(staticPlugin())
  .use(authController)
  // .use(chatController)
  // .use(organizationsController)
  // .use(ticketController)
  .use(login)
  .use(dashboard)
  .onStart(({ log }) => {
    if (config.env.NODE_ENV === "development") {
      void fetch("http://localhost:3001/restart");
      // log.debug("🦊 Triggering Live Reload");
      console.log("🦊 Triggering Live Reload");
    }
  })
  .onError(({ code, error, request, log }) => {
    // log.error(` ${request.method} ${request.url}`, code, error);
    console.error(error);
  })
  .listen(3000);

export type App = typeof app;

console.log(
  `app is listening on http://${app.server?.hostname}:${app.server?.port}`,
);
