import { Router } from "express";

import { RoutesController } from "./routes.controller";

import { authMiddleware } from "../../middlewares/auth.middleware";

import { requireRole } from "../../middlewares/role.middleware";

const router = Router();

router.post(
  "/",

  authMiddleware,

  requireRole("DRIVER"),

  RoutesController.create
);

router.get(
  "/",
  authMiddleware,
  RoutesController.getAll
);

export default router;