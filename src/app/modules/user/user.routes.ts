import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";
import { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import { multerUpload } from "../../config/multer.config";

export const router = Router();

router.post(
  "/register",
  multerUpload.single("file"),
  validateRequest(userValidation.createUserZodSchema),
  UserControllers.createUser
);

router.patch(
  "/:id",
  checkAuth(...Object.values(Role)),
  multerUpload.single("file"),
  UserControllers.updateUser
);

router.get(
  "/all-users",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  UserControllers.getAllUsers
);

export const UserRoutes = router;
