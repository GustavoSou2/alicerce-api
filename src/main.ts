import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api");

  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type, Authorization",
  });

  const port = process.env.PORT ?? 3000;

  console.log(`🚀 Server started on http://localhost:${port}`);
  
  await app.listen(port);

  logRoutes(app);
}

function logRoutes(app) {
  const server = app.getHttpServer();
  const router = server._events.request._router;

  if (!router) {
    return;
  }

  const routes = router.stack
    .filter((layer) => layer.route)
    .map((layer) => ({
      Method: Object.keys(layer.route.methods)[0].toUpperCase(),
      Path: layer.route.path,
    }));

  console.log("\n📌 Listagem de Rotas Registradas:");
  console.table(routes);
}
bootstrap();
