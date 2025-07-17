import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import AuthRouter from "../modules/auth/auth.route";
import divisionRouter from "../modules/division/division.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/division",
    route: divisionRouter,
  },
];

moduleRoutes.forEach((r) => {
  router.use(r.path, r.route);
});

export default router;
