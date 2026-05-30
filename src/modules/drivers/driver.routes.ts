import { Router } from "express";

import { DriverController } from "./driver.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/profile",

  authMiddleware,

  requireRole("DRIVER"),

  DriverController.createProfile
);

export default router;