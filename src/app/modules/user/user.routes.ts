import {  Router } from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { userValidation } from "./user.validation";


export const router = Router();


router.post("/register", validateRequest(userValidation.createUserZodSchema) , UserControllers.createUser  );

router.get("/all-users", UserControllers.getAllUsers);

export const UserRoutes = router;
