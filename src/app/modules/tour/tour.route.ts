import { Router } from "express";
import { tourController } from "./tour.controller";
import checkAuth from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createTourTypeZodSchema,
  createTourZodSchema,
} from "./tour.validation";

const router = Router();

//**!-----------Tour Types Route----------- */

router.get("/tour-types", tourController.getAllTourTypes);

router.post(
  "/create-tour-types",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  tourController.createTourType
);

router.patch(
  "/tour-types/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourTypeZodSchema),
  tourController.updateTourType
);

router.delete(
  "/tour-types/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.deleteTour
);

//**!-----------Tour Route----------- */

router.get("/", tourController.getAllTours);

router.post(
  "/create",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourZodSchema),
  tourController.createTour
);

router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  validateRequest(createTourZodSchema),
  tourController.updateTour
);

router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  tourController.deleteTour
);

const tourRouter = router;
export default tourRouter;
