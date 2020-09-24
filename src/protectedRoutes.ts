import { SwaggerRouter } from "koa-swagger-decorator";
import { user } from "./controller";
import { instalment } from "./controller";
import { auth } from "./controller";

const protectedRouter = new SwaggerRouter();

//Auth Routes
protectedRouter.get("/login", auth.signin);

// USER ROUTES
protectedRouter.get("/users", user.getUsers);
protectedRouter.get("/users/:id", user.getUser);
protectedRouter.post("/users", user.createUser);
protectedRouter.put("/users/:id", user.updateUser);
protectedRouter.delete("/users/:id", user.deleteUser);

// instalments ROUTES
protectedRouter.get("/instalments", instalment.getInstalments);
protectedRouter.get("/instalments/:id", instalment.getInstalment);
protectedRouter.post("/instalments", instalment.createInstalment);
protectedRouter.put("/instalments/:id", instalment.updateInstalment);
protectedRouter.delete("/instalments/:id", instalment.deleteInstalment);
protectedRouter.get("/instalments/user/:id", instalment.getInstalmentByUserId);

// Swagger endpoint
protectedRouter.swagger({
    title: "Oraan API Documentation",
    version: "1.0.0"
});

// mapDir will scan the input dir, and automatically call router.map to all Router Class
protectedRouter.mapDir(__dirname);

export { protectedRouter };